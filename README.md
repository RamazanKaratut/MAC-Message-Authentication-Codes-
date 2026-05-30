# Mesaj Kimlik Doğrulama Kodları (MAC) - Python Uygulaması

Bu proje, **Bilgi Güvenliği ve Kriptografi** dersi kapsamında Mesaj Kimlik Doğrulama Kodlarının (MAC) çalışma mantığını uygulamalı olarak göstermek amacıyla hazırlanmıştır. 

Uygulama, Python'un yerleşik kütüphanelerini kullanarak HMAC-SHA256 algoritması ile veri bütünlüğü ve kaynak doğrulaması süreçlerini simüle eder.

## 🚀 Özellikler

- **HMAC-SHA256 Etiket Üretimi:** Ortak gizli anahtar ve mesaj kullanılarak kriptografik kontrol toplamı oluşturma.
- **Güvenli Doğrulama:** Zamanlama (timing) saldırılarına karşı `hmac.compare_digest` kullanılarak güvenli etiket karşılaştırması.
- **Senaryo Simülasyonu:** Gönderici (Alice), Alıcı (Bob) ve araya giren aktif saldırgan (Oscar) senaryolarının kod üzerinde test edilmesi.

## 🛠️ Kurulum ve Kullanım

Bu proje harici bir bağımlılık (pip paketi) gerektirmez. Yerleşik `hmac` ve `hashlib` modüllerini kullandığı için standart bir Python 3 ortamında doğrudan çalıştırılabilir.

1. Projeyi bilgisayarınıza klonlayın veya indirin:
   ```bash
   git clone <repo-url>
   cd <proje-klasoru>

2. Terminal veya komut satırından Python dosyasını çalıştırın:
   python mac_example.py

3. Çıktı üzerinde Alice'in mesaj gönderimini, Bob'un doğrulamasını ve Oscar'ın başarısız sahtecilik girişimini gözlemleyin.



👥 Hazırlayanlar
Bu proje ve ilgili sunum materyalleri aşağıdaki ekip tarafından hazırlanmıştır:

Ramazan Karatut
Eyüp Can Şen

📝 Lisans
Bu proje akademik ve eğitim amaçlı olarak hazırlanmıştır.