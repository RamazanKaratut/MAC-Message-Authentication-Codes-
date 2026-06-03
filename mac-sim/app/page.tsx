"use client";

import React, { useState } from "react";
import { User, Network, UserCheck, Send, ArrowDown, ShieldCheck, Ban, AlertTriangle } from "lucide-react";
import { computeMAC } from "../utils/mac";

export default function MacSimulation() {
  const [scenario, setScenario] = useState(1);
  const [currentStep, setCurrentStep] = useState(1);
  
  const [aliceMsg, setAliceMsg] = useState("Hesaba 1000 TL transfer et.");
  const [aliceKey] = useState("gizli_anahtar_123");
  const [aliceMac, setAliceMac] = useState("Bekleniyor...");
  
  const [wireMsg, setWireMsg] = useState("");
  const [wireMac, setWireMac] = useState("");
  const [oscarTamperedMsg, setOscarTamperedMsg] = useState("Hesaba 9999 TL transfer et.");
  const [oscarAppendedMsg, setOscarAppendedMsg] = useState("&OSCAR=ADMIN");
  
  const [bobReceivedMsg, setBobReceivedMsg] = useState("");
  const [bobReceivedMac, setBobReceivedMac] = useState("...");
  const [bobCalculatedMac, setBobCalculatedMac] = useState("...");
  const [verificationStatus, setVerificationStatus] = useState<"none" | "success" | "fail" | "critical">("none");

  const handleScenarioChange = (num: number) => {
    setScenario(num);
    setCurrentStep(1);
    setAliceMac("Bekleniyor...");
    setWireMsg("");
    setWireMac("");
    setBobReceivedMsg("");
    setBobReceivedMac("...");
    setBobCalculatedMac("...");
    setVerificationStatus("none");
  };

  const handleGenerateMAC = async () => {
    const isWeak = scenario === 3;
    const mac = await computeMAC(aliceKey, aliceMsg, isWeak);
    setAliceMac(mac);
    setWireMsg(aliceMsg);
    setWireMac(mac);
    setCurrentStep(2);
  };

  const performLengthExtension = async () => {
    const forgedMsg = aliceMsg + oscarAppendedMsg;
    const forgedMac = await computeMAC(aliceKey, forgedMsg, true);
    setWireMsg(forgedMsg);
    setWireMac(forgedMac);
    alert("Saldırgan anahtarı bilmeden önceki MAC durumundan faydalanarak yeni geçerli bir MAC üretti!");
  };

  const transmitToBob = async () => {
    let finalMsg = wireMsg;
    const finalMac = wireMac;

    if (scenario === 2) {
      finalMsg = oscarTamperedMsg;
    }

    setBobReceivedMsg(finalMsg);
    setBobReceivedMac(finalMac);
    setCurrentStep(3);

    const isWeak = scenario === 3;
    const calculated = await computeMAC(aliceKey, finalMsg, isWeak);
    setBobCalculatedMac(calculated);

    if (finalMac === calculated) {
      setVerificationStatus(scenario === 3 ? "critical" : "success");
    } else {
      setVerificationStatus("fail");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans text-slate-800 flex flex-col items-center">
      <div className="w-full max-w-5xl rounded-xl bg-white shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-[#005088] p-6 text-center text-white h-[100px] flex flex-col justify-center">
          <h1 className="text-3xl font-bold">Mesaj Kimlik Doğrulama Kodları (MAC) Lab</h1>
        </div>

        {/* Navigation */}
        <div className="flex w-full justify-center gap-4 bg-slate-50 p-4 border-b border-slate-200 h-[80px] items-center">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => handleScenarioChange(num)}
              className={`px-4 py-2 font-semibold rounded-lg transition-colors shrink-0 ${
                scenario === num
                  ? "bg-[#005088] text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-100"
              }`}
            >
              {num === 1 && "1. Güvenli (HMAC)"}
              {num === 2 && "2. Bütünlük İhlali"}
              {num === 3 && "3. Uzunluk Uzatma Saldırısı"}
            </button>
          ))}
        </div>

        <div className="p-8 grid gap-6 w-full">
          
          {/* STEP 1: ALICE */}
          <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6 relative w-full overflow-hidden">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                <User size={20} />
              </div>
              <h2 className="text-xl font-bold text-blue-900 truncate">Alice (Gönderici)</h2>
            </div>
            <div className="flex w-full gap-6">
              <div className="flex-1 min-w-0">
                <label className="mb-1 block text-sm font-semibold text-slate-600 truncate">Gönderilecek Mesaj (x)</label>
                <input type="text" value={aliceMsg} onChange={(e) => setAliceMsg(e.target.value)} disabled={currentStep !== 1} className="w-full rounded border border-slate-300 p-2 outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100" />
              </div>
              <div className="flex-1 min-w-0">
                <label className="mb-1 block text-sm font-semibold text-slate-600 truncate">Gizli Anahtar (k)</label>
                <input type="password" value={aliceKey} readOnly className="w-full rounded border border-slate-300 bg-slate-100 p-2 text-slate-500" />
              </div>
            </div>
            <div className="mt-4 flex w-full items-end gap-4">
              <button onClick={handleGenerateMAC} disabled={currentStep !== 1} className="flex shrink-0 items-center gap-2 rounded bg-blue-600 px-6 py-2 font-bold text-white shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                MAC Hesapla <Send size={16} />
              </button>
              <div className="flex-1 min-w-0">
                <label className="mb-1 block text-xs font-semibold text-slate-500 truncate">Üretilen Etiket (m)</label>
                <div className="flex h-10 w-full items-center rounded border border-slate-300 bg-slate-200 p-2 text-sm font-mono text-slate-700 truncate">
                  {aliceMac}
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: NETWORK / OSCAR */}
          <div className={`rounded-lg border-2 border-red-200 bg-red-50 p-6 w-full overflow-hidden transition-opacity duration-300 ${currentStep < 2 ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
            <div className="mb-4 flex items-center gap-3 text-red-700">
              <Network className="shrink-0" size={24} />
              <h2 className="text-xl font-bold truncate">Ağ Kanalı & Oscar (Ortadaki Adam)</h2>
            </div>
            
            <div className="h-[90px] w-full">
              {scenario === 1 && (
                <div className="rounded border border-slate-200 bg-white p-4 italic text-slate-600 h-full flex items-center w-full">
                  Mesaj ağ üzerinden güvenle iletiliyor. Müdahale yok.
                </div>
              )}
              {scenario === 2 && (
                <div className="rounded border border-red-300 bg-white p-3 shadow-sm h-full w-full">
                  <p className="mb-1 text-xs font-bold text-red-600 truncate">Oscar mesajı değiştiriyor ancak MAC'i güncelleyemiyor!</p>
                  <input type="text" value={oscarTamperedMsg} onChange={(e) => setOscarTamperedMsg(e.target.value)} className="w-full rounded border border-red-300 p-2 outline-none focus:ring-2 focus:ring-red-500 text-sm" />
                </div>
              )}
              {scenario === 3 && (
                <div className="rounded border border-red-300 bg-white p-3 shadow-sm h-full flex flex-col justify-center w-full overflow-hidden">
                  <div className="flex w-full items-end gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex w-full">
                        <input type="text" value={aliceMsg} readOnly className="w-1/2 rounded-l border border-slate-300 bg-slate-100 p-2 text-slate-500 outline-none text-sm min-w-0" />
                        <span className="border-y border-slate-300 bg-slate-200 p-2 font-bold text-sm shrink-0">||</span>
                        <input type="text" value={oscarAppendedMsg} onChange={(e) => setOscarAppendedMsg(e.target.value)} className="w-1/2 rounded-r border border-red-300 p-2 outline-none focus:ring-2 focus:ring-red-500 text-sm min-w-0" />
                      </div>
                    </div>
                    <button onClick={performLengthExtension} className="shrink-0 rounded bg-red-600 px-4 py-2 font-bold text-white shadow-md hover:bg-red-700 text-sm">
                      Sahte MAC Üret
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex w-full items-center gap-4">
              <div className="flex-1 min-w-0 rounded bg-slate-800 p-3 font-mono text-sm shadow-inner h-[44px] flex items-center overflow-hidden">
                <span className="text-green-400 shrink-0">Paket: [</span>
                <span className="text-white ml-1 truncate shrink-0 max-w-[40%]">{scenario === 2 ? oscarTamperedMsg : wireMsg || "..."}</span>
                <span className="text-green-400 mx-1 shrink-0">,</span>
                <span className="text-yellow-400 truncate flex-1 min-w-0">{wireMac || "..."}</span>
                <span className="text-green-400 ml-1 shrink-0">]</span>
              </div>
              <button onClick={transmitToBob} className="flex shrink-0 items-center gap-2 rounded bg-slate-700 px-6 py-2 font-bold text-white hover:bg-slate-800 h-[44px]">
                Bob'a İlet <ArrowDown size={16} />
              </button>
            </div>
          </div>

          {/* STEP 3: BOB */}
          <div className={`rounded-lg border-2 border-green-200 bg-green-50 p-6 w-full overflow-hidden transition-opacity duration-300 ${currentStep < 3 ? "opacity-40 pointer-events-none" : "opacity-100"}`}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                <UserCheck size={20} />
              </div>
              <h2 className="text-xl font-bold text-green-900 truncate">Bob (Alıcı)</h2>
            </div>

            <div className="flex w-full gap-4">
              <div className="w-1/2 min-w-0">
                <label className="mb-1 block text-xs font-semibold text-slate-500 truncate">Gelen Mesaj (x)</label>
                <div className="flex h-10 w-full items-center rounded border border-slate-300 bg-white p-2 text-sm text-slate-700 truncate">{bobReceivedMsg || "..."}</div>
              </div>
              <div className="w-1/4 min-w-0">
                <label className="mb-1 block text-xs font-semibold text-slate-500 truncate">Gelen Etiket (m)</label>
                <div className="flex h-10 w-full items-center rounded border border-slate-300 bg-white p-2 text-xs font-mono truncate">{bobReceivedMac}</div>
              </div>
              <div className="w-1/4 min-w-0">
                <label className="mb-1 block text-xs font-semibold text-blue-600 truncate">Hesaplanan Etiket (m')</label>
                <div className="flex h-10 w-full items-center rounded border border-blue-300 bg-blue-100 p-2 text-xs font-mono truncate">{bobCalculatedMac}</div>
              </div>
            </div>

            <div className="mt-4 h-[90px] w-full">
              {verificationStatus === "success" && (
                <div className="flex w-full items-center gap-4 rounded border-2 border-green-500 bg-green-100 p-4 text-green-700 h-full overflow-hidden">
                  <ShieldCheck className="shrink-0" size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-bold truncate">DOĞRULAMA BAŞARILI</div>
                    <div className="text-sm truncate">Gelen mesaj ile hesaplanan MAC eşleşti. Veri bütünlüğü doğrulandı.</div>
                  </div>
                </div>
              )}
              {verificationStatus === "fail" && (
                <div className="flex w-full items-center gap-4 rounded border-2 border-red-500 bg-red-100 p-4 text-red-700 h-full overflow-hidden">
                  <Ban className="shrink-0" size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-bold truncate">DOĞRULAMA BAŞARISIZ (REDDEDİLDİ)</div>
                    <div className="text-sm truncate">Beklenen MAC ile gelen MAC uyuşmuyor. Mesaja yolda müdahale edilmiş!</div>
                  </div>
                </div>
              )}
              {verificationStatus === "critical" && (
                <div className="flex w-full items-center gap-4 rounded border-2 border-red-500 bg-red-100 p-4 text-red-700 h-full overflow-hidden">
                  <AlertTriangle className="shrink-0" size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="text-lg font-bold truncate">BÜTÜNLÜK İHLALİ! (Kritik Hata)</div>
                    <div className="text-sm truncate">Bob mesajı DOĞRU kabul etti ancak mesaj uzatılmıştı! Zayıf MAC tasarımı nedeniyle sahtecilik başarılı oldu.</div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}