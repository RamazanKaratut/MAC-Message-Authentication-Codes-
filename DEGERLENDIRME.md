# Mesaj Kimlik Doğrulama Kodları (MAC) - Değerlendirme Testi

Bu test, MAC protokollerinin temel kavramlarını ölçmek amacıyla hazırlanmıştır. Her sorunun yalnızca bir doğru cevabı vardır.

---

### Soru 1: MAC'in Temel Amacı
Mesaj Kimlik Doğrulama Kodlarının (MAC) haberleşmedeki birincil amacı aşağıdakilerden hangisidir?
- [ ] A) Verinin sadece şifrelenerek gizli kalmasını sağlamak
- [ ] B) Veri bütünlüğünü korumak ve kaynağını doğrulamak
- [ ] C) Veri iletim hızını artırmak
- [ ] D) Mesaj boyutunu sıkıştırarak küçültmek
- [ ] E) IP adreslerini şifreleyerek anonimleştirmek

### Soru 2: Zorunlu Paylaşım
MAC oluştururken gönderici ve alıcının iletişimden önce neyi paylaşması kesinlikle zorunludur?
- [ ] A) Açık anahtar (Public key)
- [ ] B) Dijital sertifika
- [ ] C) Ortak bir gizli anahtar
- [ ] D) Rastgele bir onay kodu (Nonce)
- [ ] E) MAC adresi tablosu

### Soru 3: Şifreleme ve Bütünlük
Sadece güçlü bir şifreleme algoritması (örneğin AES) kullanmak, veri bütünlüğünü garanti eder mi?
- [ ] A) Evet, şifreli veri kesinlikle değiştirilemez.
- [ ] B) Evet, ama sadece büyük dosyalarda işe yarar.
- [ ] C) Hayır, şifreleme sadece veri bütünlüğü yerine sadece hızı artırır.
- [ ] D) Hayır, şifreleme sadece gizlilik sağlar, aktif değişiklikleri tespit edemez.
- [ ] E) Hayır, çünkü şifreleme algoritmalarının tamamı internette herkese açıktır.

### Soru 4: Dijital İmza Karşılaştırması
Dijital İmza ile MAC arasındaki en belirgin kriptografik fark nedir?
- [ ] A) MAC inkar edilemezlik (non-repudiation) sağlamaz, Dijital İmza sağlar.
- [ ] B) MAC daha yavaştır.
- [ ] C) Dijital imza ortak gizli anahtar kullanır.
- [ ] D) MAC sadece metin dosyalarında çalışır.
- [ ] E) Dijital imza hiçbir matematiksel işlem gerektirmez.

### Soru 5: Zafiyetler
Uzunluk Uzatma Saldırısı (Length Extension Attack) genellikle hangi hatalı MAC tasarımında ortaya çıkar?
- [ ] A) Gizli Önek (Secret Prefix) tasarımında
- [ ] B) HMAC tasarımında
- [ ] C) Blok şifre (CBC-MAC) tasarımında
- [ ] D) Asimetrik şifreleme tasarımlarında
- [ ] E) CMAC tasarımında

### Soru 6: HMAC Mimarisi
HMAC algoritması neden iç içe iki katmanlı (Inner ve Outer Loop) bir hash yapısı kullanır?
- [ ] A) Sadece tek bir hash fonksiyonu desteklediği için.
- [ ] B) İç durum bilgisini dışarıdan gizleyip uzunluk uzatma gibi saldırıları önlemek için.
- [ ] C) Şifreleme hızını iki katına çıkarmak için.
- [ ] D) Kodu daha karmaşık hale getirmek için.
- [ ] E) Anahtarı iki farklı kişiye paylaştırmak için.

### Soru 7: Saldırganın Sınırları
Bir saldırgan, ağdan geçen MAC etiketini ve mesajı ele geçirdiğinde neden sahte bir mesaj üretemez?
- [ ] A) MAC algoritması şifreyi çözmeyi imkansız kıldığı için.
- [ ] B) Mesajı doğrulayacak ortak gizli anahtarı bilmediği için.
- [ ] C) İnternet protokolleri buna izin vermediği için.
- [ ] D) Mesajlar her zaman asimetrik olarak şifrelendiği için.
- [ ] E) Mesajın boyutu ağ üzerinde kilitlendiği için.

### Soru 8: Alternatif Tasarımlar
Sisteminizde güvenli bir Hash fonksiyonu (örneğin SHA-256) yoksa, bütünlük doğrulaması için hangi alternatif yöntemi kullanabilirsiniz?
- [ ] A) Sadece düz metin iletimi
- [ ] B) AES gibi blok şifrelemeye dayalı CBC-MAC veya CMAC
- [ ] C) Wi-Fi şifresi
- [ ] D) RSA Asimetrik Şifreleme
- [ ] E) Dijital sertifika ile bağlantı şifreleme

### Soru 9: Doğrulama Sonucu
Bir alıcı, gelen verinin MAC doğrulamasını başarıyla geçtiğinde aşağıdaki önermelerden hangisini kesinlikle söyleyebilir?
- [ ] A) "Bu mesajı benden başka hiç kimse okuyamadı."
- [ ] B) "Bu mesajın boyutu yarı yarıya küçültüldü."
- [ ] C) "Bu mesajı kesinlikle doğru kişi gönderdi ve yolda hiç değişmedi."
- [ ] D) "Bu mesajı tüm dünyaya açık bir şekilde kanıtlayabilirim."
- [ ] E) "Bu mesaj asimetrik anahtarlarla oluşturulmuştur."

### Soru 10: Terminoloji
MAC işlemi sonucunda ortaya çıkan ve mesajın yanına eklenen küçük, sabit boyutlu doğrulama verisine ne ad verilir?
- [ ] A) Şifreli metin (Ciphertext)
- [ ] B) Etiket (Tag) veya Kriptografik kontrol toplamı
- [ ] C) Açık anahtar (Public key)
- [ ] D) Dijital sertifika
- [ ] E) Başlangıç vektörü (IV)

---

<details>
<summary><strong>✅ Cevap Anahtarını Görmek İçin Tıklayın</strong></summary>

1. **B** - Veri bütünlüğünü korumak ve kaynağını doğrulamak
2. **C** - Ortak bir gizli anahtar
3. **D** - Hayır, şifreleme sadece gizlilik sağlar, aktif değişiklikleri tespit edemez.
4. **A** - MAC inkar edilemezlik (non-repudiation) sağlamaz, Dijital İmza sağlar.
5. **A** - Gizli Önek (Secret Prefix) tasarımında
6. **B** - İç durum bilgisini dışarıdan gizleyip uzunluk uzatma gibi saldırıları önlemek için.
7. **B** - Mesajı doğrulayacak ortak gizli anahtarı bilmediği için.
8. **B** - AES gibi blok şifrelemeye dayalı CBC-MAC veya CMAC
9. **C** - "Bu mesajı kesinlikle doğru kişi gönderdi ve yolda hiç değişmedi."
10. **B** - Etiket (Tag) veya Kriptografik kontrol toplamı

</details>