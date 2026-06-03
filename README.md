# 🛡️ Mesaj Kimlik Doğrulama Kodları (MAC) - İnteraktif Web Simülasyonu

Bu proje, **Bilgi Güvenliği ve Kriptografi** dersi kapsamında Mesaj Kimlik Doğrulama Kodlarının (MAC) çalışma mantığını ve potansiyel tasarım zafiyetlerini uygulamalı olarak göstermek amacıyla hazırlanmıştır. 

Uygulama, modern web teknolojileri (Next.js & React) ve tarayıcı tabanlı **Web Crypto API (SHA-256)** kullanılarak veri bütünlüğü, kaynak doğrulaması ve ortadaki adam (Ortadaki Adam - MITM) saldırı süreçlerini interaktif bir arayüzle simüle eder.

## 🚀 Özellikler

- **İnteraktif Algoritma Simülasyonu:** Güvenli HMAC yapısı ile zafiyetli "Gizli Önek" (Secret Prefix) yapısının tarayıcı üzerinde canlı karşılaştırması.
- **3 Farklı Ağ Senaryosu:**
  1. **Güvenli İletişim:** Verinin yolda bozulmadan iletilmesi ve Bob tarafından başarıyla doğrulanması.
  2. **Mesaj Manipülasyonu (Bütünlük İhlali):** Araya giren saldırganın (Oscar) mesajı değiştirmesi ancak anahtarı bilmediği için MAC etiketini güncelleyememesi sonucu Bob'un mesajı reddetmesi.
  3. **Uzunluk Uzatma Saldırısı (Length Extension Attack):** Zayıf bir MAC tasarımı `h(k || x)` kullanıldığında, Oscar'ın anahtarı bilmeden önceki MAC durumunu kullanarak mesaja ekleme yapması ve geçerli bir sahte etiket üretmesi (Kritik Zafiyet).
- **İzole Kriptografi Modülü:** Şifreleme algoritmalarının sunum sırasında kod üzerinden kolayca anlatılabilmesi için arayüzden ayrıştırılmış modüler yapı (`utils/mac.ts`).

## 🛠️ Teknolojiler

- **Framework:** Next.js (React)
- **Stil & UI:** Tailwind CSS, `lucide-react` (İkonlar)
- **Kriptografi:** Web Crypto API (`crypto.subtle.digest`)
- **Dil:** TypeScript

## ⚙️ Kurulum ve Kullanım

Proje yerel ortamda Node.js gerektirir. Kurulumu tamamladıktan sonra projeyi anında ayağa kaldırabilirsiniz:

1. Projeyi bilgisayarınıza klonlayın veya indirin:
   ```bash
   git clone <repo-url>
   cd <proje-klasoru>

2. Gerekli bağımlılıkları yükleyin:
   npm install
   npm install lucide-react

3. Geliştirme sunucusunu başlatın:
   http://localhost:3000



👥 Hazırlayanlar
Bu proje ve ilgili sunum materyalleri aşağıdaki ekip tarafından hazırlanmıştır:

Ramazan Karatut,
Eyüp Can Şen

📝 Lisans
Bu proje akademik ve eğitim amaçlı olarak hazırlanmıştır.