import { type NextRequest, NextResponse } from "next/server"
import { Client } from "@gradio/client"
import { extractDiseaseName, getDiseaseInfo } from "@/lib/disease-info"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("image") as File | null

    if (!file) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 })
    }

    const blob = new Blob([await file.arrayBuffer()], { type: file.type })

    const client = await Client.connect("ahmatfauzy/check-plant-health")

    const result = (await client.predict("/predict", { img: blob })) as {
      data?: string[]
    }

    const output = result.data?.[0] ?? "No result"

    // Format output: "Predicted: Apple___Black_rot\nConfidence: 95.23%\nSaved at: ..."
    const lines = output.split("\n")
    let fullLabel = ""
    let confidence = 0

    for (const line of lines) {
      if (line.startsWith("Predicted:")) {
        fullLabel = line.replace("Predicted:", "").trim()
      } else if (line.startsWith("Confidence:")) {
        const confStr = line.replace("Confidence:", "").replace("%", "").trim()
        confidence = Number.parseFloat(confStr)
      }
    }

    // Ekstrak hanya nama penyakit (tanpa nama tanaman)
    const diseaseNameRaw = extractDiseaseName(fullLabel)

    // Dapatkan informasi pencegahan dan penanganan
    const diseaseInfo = getDiseaseInfo(diseaseNameRaw)

    if (!diseaseInfo) {
      return NextResponse.json({
        disease: diseaseNameRaw,
        confidence: confidence,
        prevention: ["Informasi pencegahan tidak tersedia"],
        treatment: ["Informasi penanganan tidak tersedia"],
      })
    }

    return NextResponse.json({
      disease: diseaseInfo.name,
      confidence: confidence,
      prevention: diseaseInfo.prevention,
      treatment: diseaseInfo.treatment,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error("Prediction error:", error.message)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.error("Unknown error:", error)
    return NextResponse.json({ error: "Unknown error" }, { status: 500 })
  }
}
