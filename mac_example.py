import hmac
import hashlib

def generate_mac(secret_key, message):
    """
    Ortak gizli anahtar ve mesajı kullanarak HMAC-SHA256 algoritmasıyla 
    bir MAC etiketi (kriptografik kontrol toplamı) üretir.
    """
    # HMAC işlemi için string verilerini byte formatına çeviriyoruz
    key_bytes = secret_key.encode('utf-8')
    message_bytes = message.encode('utf-8')
    
    # hmac kütüphanesi ile şifreleme işlemi (SHA-256 hash fonksiyonu kullanılarak)
    mac_hash = hmac.new(key_bytes, message_bytes, hashlib.sha256)
    
    # Oluşturulan etiketi okunabilir hexadecimal (onaltılık) formatta döndürüyoruz
    return mac_hash.hexdigest()

def verify_mac(secret_key, message, received_mac):
    """
    Gelen mesajın ve MAC etiketinin doğruluğunu, eldeki anahtar ile kontrol eder.
    """
    # Alıcı, gelen mesajı kendi elindeki anahtarla tekrar MAC işlemine sokar
    expected_mac = generate_mac(secret_key, message)
    
    # Zamanlama (timing) saldırılarını önlemek için güvenli karşılaştırma metodu kullanılır
    return hmac.compare_digest(expected_mac, received_mac)

# --- ÖRNEK İLETİŞİM SENARYOSU ---
if __name__ == "__main__":
    # Alice ve Bob'un önceden anlaştığı ortak gizli anahtar
    ORTAK_ANAHTAR = "super_gizli_anahtar_123"
    
    print("--- 1. AŞAMA: GÖNDERİCİ (ALICE) ---")
    orijinal_mesaj = "Ahmet'in hesabına 1000 TL transfer et."
    # Alice mesaj için bir etiket üretir ve bunu mesajla birlikte yollar
    uretilen_etiket = generate_mac(ORTAK_ANAHTAR, orijinal_mesaj)
    
    print(f"Gönderilen Mesaj: {orijinal_mesaj}")
    print(f"Gönderilen MAC Etiketi: {uretilen_etiket}\n")

    print("--- 2. AŞAMA: ALICI (BOB) - GÜVENLİ DURUM ---")
    # Bob, Alice'in gönderdiği orijinal mesajı ve etiketi teslim alır
    if verify_mac(ORTAK_ANAHTAR, orijinal_mesaj, uretilen_etiket):
        print("Doğrulama BAŞARILI: Mesaj Alice'ten gelmiş ve yolda HİÇ DEĞİŞTİRİLMEMİŞTİR.\n")
    else:
        print("Doğrulama BAŞARISIZ.\n")

    print("--- 3. AŞAMA: SALDIRGAN (OSCAR) MÜDAHALESİ ---")
    # Oscar ağdaki mesajı yakalar, miktarı değiştirir ama anahtarı bilmediği için MAC'i değiştiremez
    sahte_mesaj = "Ahmet'in hesabına 50000 TL transfer et."
    print(f"Saldırganın İlettiği Sahte Mesaj: {sahte_mesaj}")
    
    # Bob sahte mesajı ve orijinal etiketi doğrulamaya çalışır
    if verify_mac(ORTAK_ANAHTAR, sahte_mesaj, uretilen_etiket):
        print("Doğrulama BAŞARILI.")
    else:
        print("Doğrulama BAŞARISIZ: Mesaj bütünlüğü bozulmuş! Sistem paketi REDDETTİ.")