// /src/app/api/detect/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No image uploaded" },
        { status: 400 }
      );
    }

    const blob = new Blob([await file.arrayBuffer()], { type: file.type });

    const client = await Client.connect("ahmatfauzy/check-plant-health");

    const result = (await client.predict("/predict", { img: blob })) as {
      data?: string[];
    };

    const output = result.data?.[0] ?? "No result";

    return NextResponse.json({ result: output });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Prediction error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("Unknown error:", error);
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
