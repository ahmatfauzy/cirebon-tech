// Database informasi penyakit tanaman dengan pencegahan dan penanganan
export interface DiseaseInfo {
  name: string
  prevention: string[]
  treatment: string[]
}

export const diseaseDatabase: Record<string, DiseaseInfo> = {
  Apple_scab: {
    name: "Apple Scab",
    prevention: [
      "Pilih varietas apel yang tahan terhadap penyakit kudis",
      "Buang dan hancurkan daun yang jatuh untuk mengurangi sumber infeksi",
      "Pangkas pohon untuk meningkatkan sirkulasi udara",
      "Hindari penyiraman dari atas yang dapat menyebarkan spora",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis tembaga atau sulfur",
      "Gunakan fungisida sistemik seperti myclobutanil",
      "Semprot secara teratur selama musim pertumbuhan",
      "Buang bagian tanaman yang terinfeksi parah",
    ],
  },
  Black_rot: {
    name: "Black Rot",
    prevention: [
      "Buang dan hancurkan buah dan daun yang terinfeksi",
      "Pangkas cabang yang mati atau sakit",
      "Jaga kebersihan kebun dari sisa tanaman",
      "Pastikan drainase yang baik dan sirkulasi udara",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis tembaga",
      "Gunakan fungisida mancozeb atau captan",
      "Semprot setiap 7-10 hari selama periode basah",
      "Potong dan buang bagian yang terinfeksi",
    ],
  },
  Cedar_apple_rust: {
    name: "Cedar Apple Rust",
    prevention: [
      "Tanam varietas apel yang tahan penyakit",
      "Hindari menanam apel dekat pohon cedar",
      "Buang pohon cedar dalam radius 300 meter jika memungkinkan",
      "Jaga sanitasi kebun yang baik",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis myclobutanil",
      "Gunakan fungisida propiconazole",
      "Semprot saat tunas mulai membuka hingga 2 minggu setelah jatuh kelopak",
      "Ulangi aplikasi setiap 7-14 hari",
    ],
  },
  Cercospora_leaf_spot: {
    name: "Cercospora Leaf Spot",
    prevention: [
      "Rotasi tanaman dengan tanaman non-inang",
      "Buang sisa tanaman setelah panen",
      "Hindari penyiraman dari atas",
      "Jaga jarak tanam yang cukup untuk sirkulasi udara",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis azoxystrobin",
      "Gunakan fungisida chlorothalonil",
      "Semprot setiap 7-14 hari saat kondisi lembab",
      "Buang daun yang terinfeksi parah",
    ],
  },
  Common_rust: {
    name: "Common Rust",
    prevention: [
      "Tanam varietas jagung yang tahan karat",
      "Tanam lebih awal untuk menghindari periode infeksi puncak",
      "Rotasi tanaman dengan tanaman non-inang",
      "Jaga kebersihan lahan dari gulma",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis triazole",
      "Gunakan fungisida propiconazole atau tebuconazole",
      "Semprot saat gejala pertama muncul",
      "Ulangi aplikasi sesuai label produk",
    ],
  },
  Northern_Leaf_Blight: {
    name: "Northern Leaf Blight",
    prevention: [
      "Gunakan benih bersertifikat bebas penyakit",
      "Rotasi tanaman minimal 2 tahun",
      "Buang sisa tanaman setelah panen",
      "Tanam varietas tahan penyakit",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis strobilurin",
      "Gunakan fungisida azoxystrobin atau pyraclostrobin",
      "Semprot saat gejala awal muncul",
      "Ulangi aplikasi setiap 10-14 hari",
    ],
  },
  "Esca_(Black_Measles)": {
    name: "Esca (Black Measles)",
    prevention: [
      "Gunakan alat pemangkasan yang bersih dan steril",
      "Hindari pemangkasan saat cuaca basah",
      "Lindungi luka pemangkasan dengan pasta fungisida",
      "Pilih bibit yang sehat dan bebas penyakit",
    ],
    treatment: [
      "Potong dan buang bagian tanaman yang terinfeksi",
      "Aplikasikan fungisida berbasis tembaga pada luka",
      "Tidak ada pengobatan kuratif yang efektif",
      "Fokus pada pencegahan dan sanitasi",
    ],
  },
  Leaf_blight: {
    name: "Leaf Blight",
    prevention: [
      "Jaga sanitasi kebun yang baik",
      "Buang daun yang jatuh dan terinfeksi",
      "Hindari penyiraman dari atas",
      "Pastikan sirkulasi udara yang baik",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis mancozeb",
      "Gunakan fungisida chlorothalonil",
      "Semprot setiap 7-10 hari selama kondisi lembab",
      "Buang dan hancurkan daun yang terinfeksi",
    ],
  },
  "Haunglongbing_(Citrus_greening)": {
    name: "Huanglongbing (Citrus Greening)",
    prevention: [
      "Gunakan bibit bersertifikat bebas penyakit",
      "Kendalikan populasi serangga psyllid (vektor penyakit)",
      "Buang dan hancurkan pohon yang terinfeksi",
      "Tanam pohon sehat di area bebas penyakit",
    ],
    treatment: [
      "Tidak ada pengobatan yang efektif",
      "Cabut dan hancurkan pohon yang terinfeksi",
      "Aplikasikan insektisida untuk mengendalikan psyllid",
      "Berikan nutrisi tambahan untuk memperlambat perkembangan penyakit",
    ],
  },
  Bacterial_spot: {
    name: "Bacterial Spot",
    prevention: [
      "Gunakan benih dan bibit bersertifikat bebas penyakit",
      "Rotasi tanaman dengan tanaman non-inang",
      "Hindari penyiraman dari atas",
      "Jaga kebersihan alat dan peralatan",
    ],
    treatment: [
      "Aplikasikan bakterisida berbasis tembaga",
      "Gunakan antibiotik streptomycin (jika diizinkan)",
      "Semprot setiap 5-7 hari selama kondisi basah",
      "Buang tanaman yang terinfeksi parah",
    ],
  },
  Powdery_mildew: {
    name: "Powdery Mildew",
    prevention: [
      "Tanam di lokasi dengan sinar matahari penuh",
      "Jaga jarak tanam untuk sirkulasi udara yang baik",
      "Hindari pemupukan nitrogen berlebihan",
      "Pilih varietas yang tahan penyakit",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis sulfur",
      "Gunakan fungisida myclobutanil atau trifloxystrobin",
      "Semprot setiap 7-14 hari",
      "Buang bagian tanaman yang terinfeksi parah",
    ],
  },
  Early_blight: {
    name: "Early Blight",
    prevention: [
      "Rotasi tanaman minimal 3 tahun",
      "Mulsa untuk mencegah percikan tanah ke daun",
      "Buang daun bagian bawah yang terinfeksi",
      "Jaga tanaman tetap kering dengan penyiraman di pagi hari",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis chlorothalonil",
      "Gunakan fungisida mancozeb atau azoxystrobin",
      "Semprot setiap 7-10 hari",
      "Buang dan hancurkan daun yang terinfeksi",
    ],
  },
  Late_blight: {
    name: "Late Blight",
    prevention: [
      "Gunakan benih dan bibit bersertifikat",
      "Hindari penyiraman dari atas",
      "Jaga jarak tanam yang cukup",
      "Pantau cuaca dan aplikasikan fungisida preventif saat kondisi mendukung penyakit",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis mancozeb atau chlorothalonil",
      "Gunakan fungisida sistemik seperti metalaxyl",
      "Semprot setiap 5-7 hari selama kondisi basah",
      "Buang dan hancurkan tanaman yang terinfeksi parah",
    ],
  },
  Leaf_Mold: {
    name: "Leaf Mold",
    prevention: [
      "Jaga kelembaban relatif di bawah 85%",
      "Tingkatkan ventilasi di greenhouse",
      "Hindari penyiraman dari atas",
      "Tanam varietas yang tahan penyakit",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis chlorothalonil",
      "Gunakan fungisida mancozeb",
      "Semprot setiap 7-14 hari",
      "Tingkatkan sirkulasi udara dan kurangi kelembaban",
    ],
  },
  Septoria_leaf_spot: {
    name: "Septoria Leaf Spot",
    prevention: [
      "Rotasi tanaman minimal 3 tahun",
      "Buang sisa tanaman setelah panen",
      "Mulsa untuk mencegah percikan tanah",
      "Hindari penyiraman dari atas",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis chlorothalonil",
      "Gunakan fungisida mancozeb atau copper",
      "Semprot setiap 7-10 hari",
      "Buang daun bagian bawah yang terinfeksi",
    ],
  },
  Spider_mites: {
    name: "Spider Mites",
    prevention: [
      "Jaga kelembaban yang cukup",
      "Hindari stres kekeringan pada tanaman",
      "Pantau tanaman secara teratur",
      "Dorong keberadaan predator alami",
    ],
    treatment: [
      "Semprot dengan air bertekanan tinggi untuk menghilangkan tungau",
      "Aplikasikan mitisida atau insektisida yang sesuai",
      "Gunakan sabun insektisida atau minyak hortikultura",
      "Ulangi aplikasi setiap 5-7 hari",
    ],
  },
  Target_Spot: {
    name: "Target Spot",
    prevention: [
      "Rotasi tanaman dengan tanaman non-inang",
      "Jaga sanitasi kebun yang baik",
      "Hindari penyiraman dari atas",
      "Mulsa untuk mencegah percikan tanah",
    ],
    treatment: [
      "Aplikasikan fungisida berbasis chlorothalonil",
      "Gunakan fungisida azoxystrobin atau mancozeb",
      "Semprot setiap 7-10 hari",
      "Buang daun yang terinfeksi parah",
    ],
  },
  Yellow_Leaf_Curl_Virus: {
    name: "Yellow Leaf Curl Virus",
    prevention: [
      "Gunakan bibit bebas virus",
      "Kendalikan populasi kutu kebul (whitefly)",
      "Gunakan mulsa reflektif perak",
      "Tanam varietas yang tahan virus",
    ],
    treatment: [
      "Tidak ada pengobatan untuk virus",
      "Cabut dan hancurkan tanaman yang terinfeksi",
      "Kendalikan vektor (kutu kebul) dengan insektisida",
      "Aplikasikan insektisida sistemik untuk mencegah penyebaran",
    ],
  },
  Tomato_mosaic_virus: {
    name: "Tomato Mosaic Virus",
    prevention: [
      "Gunakan benih bersertifikat bebas virus",
      "Cuci tangan dan sterilkan alat sebelum bekerja dengan tanaman",
      "Hindari merokok di dekat tanaman tomat",
      "Kendalikan gulma yang dapat menjadi inang",
    ],
    treatment: [
      "Tidak ada pengobatan untuk virus",
      "Cabut dan hancurkan tanaman yang terinfeksi",
      "Sterilkan alat dan peralatan",
      "Tanam varietas yang tahan virus",
    ],
  },
  Leaf_scorch: {
    name: "Leaf Scorch",
    prevention: [
      "Jaga kelembaban tanah yang konsisten",
      "Mulsa untuk mempertahankan kelembaban",
      "Hindari pemupukan berlebihan",
      "Tanam di lokasi dengan drainase yang baik",
    ],
    treatment: [
      "Perbaiki praktik penyiraman",
      "Aplikasikan mulsa organik",
      "Kurangi pemupukan jika berlebihan",
      "Buang daun yang terinfeksi parah",
    ],
  },
  healthy: {
    name: "Sehat",
    prevention: [
      "Lanjutkan praktik budidaya yang baik",
      "Pantau tanaman secara teratur",
      "Jaga kebersihan kebun",
      "Berikan nutrisi yang seimbang",
    ],
    treatment: [
      "Tidak diperlukan pengobatan",
      "Pertahankan kondisi tanaman yang sehat",
      "Lanjutkan pemantauan rutin",
      "Terapkan praktik pencegahan penyakit",
    ],
  },
}

// Fungsi untuk mengekstrak nama penyakit dari label Hugging Face
export function extractDiseaseName(fullLabel: string): string {
  // Format: "Plant___Disease_name" atau "Plant___healthy"
  const parts = fullLabel.split("___")
  if (parts.length < 2) return fullLabel

  // Ambil bagian setelah "___" dan format dengan baik
  const diseasePart = parts[1]
  return diseasePart.replace(/_/g, " ")
}

// Fungsi untuk mendapatkan informasi penyakit
export function getDiseaseInfo(diseaseName: string): DiseaseInfo | null {
  // Normalisasi nama penyakit untuk pencarian
  const normalizedName = diseaseName.replace(/\s+/g, "_")
  return diseaseDatabase[normalizedName] || null
}
