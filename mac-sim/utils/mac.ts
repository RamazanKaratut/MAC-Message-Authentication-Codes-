/**
 * Verilen metni Web Crypto API (SHA-256) kullanarak özetler (Hash)
 */
export async function generateHash(text: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // Byte dizisini Hex (Onaltılık) string formatına çevirir
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * Mesaj Kimlik Doğrulama Kodu (MAC) Hesaplama Fonksiyonu
 * * @param key Gizli Anahtar (Sadece Alice ve Bob bilir)
 * @param msg İletilecek veya alınan mesaj
 * @param isSecretPrefix Zafiyetli 'Gizli Önek' (Secret Prefix) yapısı kullanılacak mı?
 */
export async function computeMAC(key: string, msg: string, isSecretPrefix = false): Promise<string> {
  if (isSecretPrefix) {
    /* ZAFİYETLİ YAPI: m = h(k || x) 
      Bu yapı "Uzunluk Uzatma Saldırısına" (Length Extension Attack) açıktır.
      Saldırgan anahtarı bilmeden önceki bloktan faydalanarak yeni bir MAC üretebilir.
    */
    return await generateHash(key + msg);
  } else {
    /* GÜVENLİ YAPI (HMAC Modeli): 
      Gerçek HMAC yapısı olan h((k ⊕ opad) || h((k ⊕ ipad) || x)) formülünün 
      basitleştirilmiş simülasyonudur. İç ve dış hash dolgusu (pad) kullanır.
    */
    return await generateHash(key + "ipad" + msg + key + "opad");
  }
}