# Mesaj Kimlik Doğrulama Kodları (MAC) - Değerlendirme Testi

Bu test, kriptografik kontrol toplamları, veri bütünlüğü ve MAC protokollerinin temel kavramlarını ölçmek amacıyla hazırlanmıştır. Her sorunun yalnızca bir doğru cevabı vardır.

---

### Soru 1: MAC'in Temel Amacı
Mesaj Kimlik Doğrulama Kodlarının (MAC) siber güvenlik mimarisindeki birincil görevi aşağıdakilerden hangisidir?
- [ ] A) Veriyi şifreleyerek tamamen gizli kalmasını sağlamak
- [ ] B) Veri boyutunu sıkıştırarak ağ iletimini hızlandırmak
- [ ] C) İletişim sırasında IP adreslerini gizlemek
- [ ] D) Veri bütünlüğünü korumak ve mesajın doğru kaynaktan geldiğini doğrulamak
- [ ] E) Asimetrik anahtar çiftleri üretmek

### Soru 2: Anahtar Yönetimi
İki taraf arasında bir MAC protokolünün başarılı şekilde çalışabilmesi için haberleşmeden önce aşağıdakilerden hangisinin paylaşılması **zorunludur**?
- [ ] A) Dijital sertifika
- [ ] B) Ortak bir gizli (simetrik) anahtar
- [ ] C) Herkese açık (public) anahtar
- [ ] D) MAC adresleri tablosu
- [ ] E) Biyometrik kimlik verisi

### Soru 3: Şifreleme ve Bütünlük İlişkisi
Sadece güçlü bir şifreleme algoritması (örneğin AES-CBC modunda) kullanılarak gönderilen bir veriye, aradaki aktif bir saldırgan müdahale ederse ve sistemde MAC kontrolü yoksa ne gerçekleşir?
- [ ] A) Şifreleme algoritması müdahaleyi otomatik olarak onarır.
- [ ] B) Sistem müdahaleyi IP başlığından anında tespit eder.
- [ ] C) Veri bozuk deşifre edilir ancak sistem mesajın yolda değiştirildiğini matematiksel olarak fark edemez.
- [ ] D) Saldırganın sistemi anında kilitlenir.
- [ ] E) Mesaj tamamen silinir ve alıcıya hiç ulaşmaz.

### Soru 4: Dijital İmza Karşılaştırması
Mesaj Kimlik Doğrulama Kodları (MAC) ile Dijital İmzalar arasındaki en belirgin kriptografik ve hukuki fark aşağıdakilerden hangisidir?
- [ ] A) MAC çok daha yavaş hesaplanır.
- [ ] B) Dijital imza ortak (simetrik) anahtar kullanır.
- [ ] C) MAC sadece metin dosyalarında kullanılabilir.
- [ ] D) MAC, donanımsal hızlandırıcılara uygun değildir.
- [ ] E) MAC "inkar edilemezlik" (non-repudiation) sağlamazken, dijital imza sağlar.

### Soru 5: Gizli Önek (Secret Prefix) Zafiyeti
Basit `t = h(k || x)` (Gizli Önek) tasarımı modern uygulamalarda neden tercih edilmez?
- [ ] A) Ağ cihazlarında çok fazla enerji tükettiği için.
- [ ] B) Sadece 64-bitlik anahtarları desteklediği için.
- [ ] C) Saldırganın anahtarı bilmeden mesajın sonuna ekleme yapıp geçerli bir etiket üretebilmesi (Uzunluk Uzatma Saldırısı) yüzünden.
- [ ] D) İnternet protokolü (TCP/IP) standartlarına uymadığı için.
- [ ] E) Hesaplama süresi dijital imzalardan daha uzun olduğu için.

### Soru 6: HMAC Mimarisi
HMAC algoritmasının iç içe geçmiş iki katmanlı (Inner ve Outer loop) hash yapısı kullanmasının ana teknik sebebi nedir?
- [ ] A) Mesajı iki kat daha hızlı şifrelemek.
- [ ] B) Hash fonksiyonunun iç durumunu (internal state) gizleyerek uzunluk uzatma saldırılarını kesin olarak engellemek.
- [ ] C) Veriyi iki kez sıkıştırarak depolama alanı kazanmak.
- [ ] D) Simetrik anahtarı asimetrik anahtara dönüştürmek.
- [ ] E) Kaba kuvvet (brute-force) saldırılarını yavaşlatmak.

### Soru 7: Protokol İşleyişi
Alice ve Bob haberleşirken araya giren saldırgan Oscar, paketteki *sadece mesaj kısmını* değiştirip MAC etiketine hiç dokunmadan paketi Bob'a iletirse sistem nasıl tepki verir?
- [ ] A) Bob'un kendi anahtarıyla hesapladığı yeni etiket ile paketteki eski etiket eşleşmez, paket reddedilir.
- [ ] B) Bob mesajı kabul eder ve işlem normal devam eder.
- [ ] C) Sistem mesajın eksik kısımlarını otomatik tamamlar.
- [ ] D) Oscar gizli anahtarı otomatik olarak ele geçirmiş olur.
- [ ] E) Bob'un sistemi asimetrik şifrelemeye geçiş yapar.

### Soru 8: CBC-MAC Zafiyeti
Blok şifre tabanlı temel CBC-MAC algoritması hangi spesifik durumda kriptografik olarak tamamen **güvensiz** hale gelir ve sahteciliğe imkan tanır?
- [ ] A) AES yerine DES kullanıldığında.
- [ ] B) Mesajlar sadece donanımsal çiplere yazıldığında.
- [ ] C) İletilen mesajlar sabit bir blok boyutunda olduğunda.
- [ ] D) İletilen mesajlar değişken uzunluklara sahip olduğunda.
- [ ] E) Başlangıç Vektörü (IV) rastgele seçildiğinde.

### Soru 9: Modern Blok Şifre Standartları
Temel CBC-MAC'in zafiyetlerini gidermek için, değişken uzunluklu verileri blok şifrelerle doğrulamada kullanılan ve iki alt-anahtar üreten modern endüstri standardı hangisidir?
- [ ] A) MD5
- [ ] B) RSA
- [ ] C) CMAC
- [ ] D) Diffie-Hellman
- [ ] E) SHA-1

### Soru 10: Terminoloji
MAC işlemi sonucunda orijinal mesajın yanına eklenen ve genellikle 128-256 bit uzunluğunda olan güvenlik doğrulama verisine genel olarak ne ad verilir?
- [ ] A) Açık Anahtar (Public Key)
- [ ] B) Şifreli Metin (Ciphertext)
- [ ] C) Başlangıç Vektörü (Initialization Vector)
- [ ] D) Etiket (Tag) veya Kriptografik Kontrol Toplamı
- [ ] E) Dijital Sertifika (Certificate)

---

<details>
<summary><strong>✅ Cevap Anahtarını Görmek İçin Tıklayın</strong></summary>

1. **D** - Veri bütünlüğünü korumak ve mesajın doğru kaynaktan geldiğini doğrulamak
2. **B** - Ortak bir gizli (simetrik) anahtar
3. **C** - Veri bozuk deşifre edilir ancak sistem mesajın yolda değiştirildiğini matematiksel olarak fark edemez.
4. **E** - MAC "inkar edilemezlik" (non-repudiation) sağlamazken, dijital imza sağlar.
5. **C** - Saldırganın anahtarı bilmeden mesajın sonuna ekleme yapıp geçerli bir etiket üretebilmesi yüzünden.
6. **B** - Hash fonksiyonunun iç durumunu (internal state) gizleyerek uzunluk uzatma saldırılarını kesin olarak engellemek.
7. **A** - Bob'un kendi anahtarıyla hesapladığı yeni etiket ile paketteki eski etiket eşleşmez, paket reddedilir.
8. **D** - İletilen mesajlar değişken uzunluklara sahip olduğunda.
9. **C** - CMAC
10. **D** - Etiket (Tag) veya Kriptografik Kontrol Toplamı

</details>