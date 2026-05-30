import hmac
import hashlib

def generate_mac(secret_key, message):
    """
    Ortak gizli anahtar ve mesajı kullanarak HMAC-SHA256 algoritmasıyla 
    bir MAC etiketi (kriptografik kontrol toplamı) üretir.
    """
    key_bytes = secret_key.encode('utf-8')
    message_bytes = message.encode('utf-8')
    mac_hash = hmac.new(key_bytes, message_bytes, hashlib.sha256)
    return mac_hash.hexdigest()

def verify_mac(secret_key, message, received_mac):
    """
    Gelen mesajın ve MAC etiketinin doğruluğunu kontrol eder.
    """
    expected_mac = generate_mac(secret_key, message)
    # compare_digest fonksiyonu zamanlama (timing) saldırılarını engeller
    return hmac.compare_digest(expected_mac, received_mac)

if __name__ == "__main__":
    # Gönderici ve Alıcı arasındaki ortak gizli anahtar
    ORTAK_ANAHTAR = "gizli_anahtar_123"
    
    # ---------------------------------------------------------
    # ÜRETİM AŞAMASI (ALICE MESAJI HAZIRLIYOR)
    # ---------------------------------------------------------
    orijinal_mesaj = "Ahmet'in hesabına 1000 TL transfer et."
    orijinal_etiket = generate_mac(ORTAK_ANAHTAR, orijinal_mesaj)
    
    print("="*60)
    print("KAYNAK (ALICE) MESAJI VE ETİKETİ ÜRETİYOR")
    print("="*60)
    print(f"Orijinal Mesaj : {orijinal_mesaj}")
    print(f"Üretilen MAC   : {orijinal_etiket}\n")

    # ---------------------------------------------------------
    # SENARYO 1: DEĞİŞTİRİLMEMİŞ MESAJ (BAŞARILI İLETİŞİM)
    # ---------------------------------------------------------
    print("="*60)
    print("SENARYO 1: DEĞİŞTİRİLMEMİŞ GÜVENLİ İLETİŞİM (BOB KONTROLÜ)")
    print("="*60)
    print("Ağdan gelen veri kontrol ediliyor...")
    
    if verify_mac(ORTAK_ANAHTAR, orijinal_mesaj, orijinal_etiket):
        print("✅ SONUÇ: Doğrulama BAŞARILI. Mesaj yolda hiç değişmedi.\n")
    else:
        print("❌ SONUÇ: Doğrulama BAŞARISIZ.\n")

    # ---------------------------------------------------------
    # SENARYO 2: SADECE MESAJ DEĞİŞTİRİLDİ (SALDIRGAN MÜDAHALESİ)
    # ---------------------------------------------------------
    print("="*60)
    print("SENARYO 2: SADECE MESAJ DEĞİŞTİRİLDİ (OSCAR MÜDAHALESİ)")
    print("="*60)
    sahte_mesaj = "Ahmet'in hesabına 50000 TL transfer et."
    print(f"Ağdan Gelen Mesaj : {sahte_mesaj} (Değiştirildi!)")
    print(f"Ağdan Gelen MAC   : {orijinal_etiket} (Orijinal)")
    
    if verify_mac(ORTAK_ANAHTAR, sahte_mesaj, orijinal_etiket):
        print("✅ SONUÇ: Doğrulama BAŞARILI.\n")
    else:
        print("❌ SONUÇ: Doğrulama BAŞARISIZ. MAC uyuşmuyor, mesaj REDDEDİLDİ!\n")

    # ---------------------------------------------------------
    # SENARYO 3: SADECE ETİKET (ŞİFRE) DEĞİŞTİRİLDİ
    # ---------------------------------------------------------
    print("="*60)
    print("SENARYO 3: SADECE ŞİFRE/ETİKET DEĞİŞTİRİLDİ (OSCAR MÜDAHALESİ)")
    print("="*60)
    # Saldırgan mesajı orijinal bırakıyor ama etiketin son 4 karakterini bozuyor
    sahte_etiket = orijinal_etiket[:-4] + "0000" 
    
    print(f"Ağdan Gelen Mesaj : {orijinal_mesaj} (Orijinal)")
    print(f"Ağdan Gelen MAC   : {sahte_etiket} (Değiştirildi/Bozuldu!)")
    
    if verify_mac(ORTAK_ANAHTAR, orijinal_mesaj, sahte_etiket):
        print("✅ SONUÇ: Doğrulama BAŞARILI.\n")
    else:
        print("❌ SONUÇ: Doğrulama BAŞARISIZ. Kriptografik imza bozuk, mesaj REDDEDİLDİ!\n")