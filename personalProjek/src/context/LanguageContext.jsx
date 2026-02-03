import React, { createContext, useState, useContext, useEffect } from 'react';

// Translation Dictionary
export const translations = {
  en: {
    hero: {
      digital: "DIGITAL",
      experience: "EXPERIENCE",
      constructor: "CONSTRUCTOR",
      rolePrefix: "ROLE // ",
      roles: ["FULL_STACK_DEV", "UI_ENGINEER", "SYS_ARCHITECT"],
      initMsg: ":: INITIALIZING PORTFOLIO PROTOCOL...",
      target: "Target: Building high-performance web applications with industrial-grade precision and aesthetic excellence.",
      exploreBtn: "EXPLORE_MY_WORLD"
    },
    nav: {
      home: "HOME",
      about: "ABOUT",
      project: "PROJECT",
      contact: "CONTACT"
    },
    common: {
      modeSecure: "MODE: SECURE",
      protocolSecure: "PROTOCOL // SECURE",
      liveFeed: "LIVE_FEED"
    },
    overlay: {
      systemJump: "SYSTEM_JUMP",
      hydraulicA: "/// HYDRAULIC_A CLOSED",
      hydraulicB: "/// HYDRAULIC_B CLOSED",
      secure: "SECURE"
    },
    entrance: {
      systemCheck: "SYSTEM_CHECK",
      biosVerified: "BIOS_VERIFIED",
      neuralLink: "NEURAL_LINK_EST",
      memAlloc: "MEM_ALLOC_OK",
      accessGranted: "ACCESS GRANTED",
      initializing: "INITIALIZING...",
      decrypting: "DECRYPTING KEY...",
      authorized: "ACCESS AUTHORIZED",
      coreOnline: "CORE: ONLINE",
      secureBoot: "SECURE_BOOT: TRUE"
    },
    about: {
      title: "PERSONNEL//FILE",
      operative: "OPERATIVE: ",
      role: "Full Stack Developer & UI Engineer.",
      description: "Specialized in building high-fidelity digital interfaces and robust backend systems. Focus on performance optimization and industrial aesthetic integration. Deploying solutions that meet rigorous technical standards.",
      skillsTitle: "COMBAT_MODULES (SKILLS)"
    },
    project: {
      header: "/// SECURE_ARCHIVES ///",
      title: "MISSION_LOGS",
      searchPlaceholder: "SEARCH_PROJECT //",
      preview: "// PREVIEW",
      viewBtn: "INITIALIZE LINK",
      notFound: "[ERROR]: RECORDS_NOT_FOUND // CHECK_QUERY",
      status: {
        complete: "COMPLETE",
        inProgress: "IN_PROGRESS",
        online: "ONLINE"
      }
    },
    contact: {
      uplinkReady: "UPLINK_READY",
      busy: "// BUSY",
      title: "TRANSMISSION",
      subtitle: "/// ENCRYPTED_CHANNEL_OPEN ///",
      nameLabel: "CODENAME_ID",
      namePlace: "ENTER IDENTIFIER",
      emailLabel: "FREQ_MOD (EMAIL)",
      emailPlace: "ENTER FREQUENCY",
      msgLabel: "DATA_PACKET (MESSAGE)",
      msgPlace: "INPUT DATA STREAM...",
      listening: "[ LISTENING ]",
      sendBtn: "INITIATE_UPLOAD",
      sending: "ENCRYPTING & SENDING...",
      successTitle: "/// TRANSMISSION_COMPLETE ///",
      successMsg: "DATA PACKET SECURELY UPLOADED TO SERVER. AWAITING HANDSHAKE RESPONSE."
    }
  },
  id: {
    hero: {
      digital: "DIGITAL",
      experience: "PENGALAMAN",
      constructor: "KONSTRUKTOR",
      rolePrefix: "PERAN // ",
      roles: ["PENGEMBANG_FULL_STACK", "INSINYUR_UI", "ARSITEK_SISTEM"],
      initMsg: ":: MEMULAI PROTOKOL PORTFOLIO...",
      target: "Target: Membangun aplikasi web berkinerja tinggi dengan presisi tingkat industri dan keunggulan estetika.",
      exploreBtn: "JELAJAHI_DUNIA_SAYA"
    },
    nav: {
      home: "BERANDA",
      about: "TENTANG",
      project: "PROYEK",
      contact: "KONTAK"
    },
    common: {
      modeSecure: "MODE: AMAN",
      protocolSecure: "PROTOKOL // AMAN",
      liveFeed: "SIARAN_LANGSUNG"
    },
    overlay: {
      systemJump: "LOMPATAN_SISTEM",
      hydraulicA: "/// HIDROLIK_A DITUTUP",
      hydraulicB: "/// HIDROLIK_B DITUTUP",
      secure: "AMAN"
    },
    entrance: {
      systemCheck: "CEK_SISTEM",
      biosVerified: "BIOS_TERVERIFIKASI",
      neuralLink: "KONEKSI_NEURAL_EST",
      memAlloc: "ALOKASI_MEMORI_OK",
      accessGranted: "AKSES DIBERIKAN",
      initializing: "MEMULAI...",
      decrypting: "MENDEKRIPSI KUNCI...",
      authorized: "AKSES DIOTORISASI",
      coreOnline: "INTI: ONLINE",
      secureBoot: "BOOT_AMAN: BENAR"
    },
    about: {
      title: "PERSONEL//BERKAS",
      operative: "OPERATIF: ",
      role: "Pengembang Full Stack & Insinyur UI.",
      description: "Spesialis dalam membangun antarmuka digital kesetiaan tinggi dan sistem backend yang tangguh. Fokus pada optimalisasi kinerja dan integrasi estetika industri. Menerapkan solusi yang memenuhi standar teknis yang ketat.",
      skillsTitle: "MODUL_TEMPUR (KEAHLIAN)"
    },
    project: {
      header: "/// ARSIP_AMAN ///",
      title: "CATATAN_MISI",
      searchPlaceholder: "CARI_PROYEK //",
      preview: "// PRATINJAU",
      viewBtn: "INISIASI TAUTAN",
      notFound: "[ERROR]: REKAMAN_TIDAK_DITEMUKAN // CEK_KUERI",
      status: {
        complete: "SELESAI",
        inProgress: "SEDANG_BERJALAN",
        online: "ONLINE"
      }
    },
    contact: {
      uplinkReady: "UPLINK_SIAP",
      busy: "// SIBUK",
      title: "TRANSMISI",
      subtitle: "/// SALURAN_TERENKRIPSI_TERBUKA ///",
      nameLabel: "NAMA_KODE_ID",
      namePlace: "MASUKKAN PENGENAL",
      emailLabel: "MOD_FREQ (EMAIL)",
      emailPlace: "MASUKKAN FREKUENSI",
      msgLabel: "PAKET_DATA (PESAN)",
      msgPlace: "MASUKKAN ALIRAN DATA...",
      listening: "[ MENDENGARKAN ]",
      sendBtn: "MULAI_UNGGAH",
      sending: "MENGENKRIPSI & MENGIRIM...",
      successTitle: "/// TRANSMISI_SELESAI ///",
      successMsg: "PAKET DATA BERHASIL DIUNGGAH KE SERVER. MENUNGGU RESPON JABAT TANGAN."
    }
  },
  jp: {
    hero: {
      digital: "デジタル",
      experience: "体験",
      constructor: "構築者",
      rolePrefix: "役割 // ",
      roles: ["フルスタック開発者", "UIエンジニア", "システムアーキテクト"], // Keep these simple for typewriter
      initMsg: ":: ポートフォリオプロトコルを開始中...",
      target: "目標：工業レベルの精度と美的卓越性を備えた高性能Webアプリケーションの構築。",
      exploreBtn: "世界を探索する"
    },
    nav: {
      home: "ホーム",
      about: "約|やく",
      project: "プロジェクト",
      contact: "接触|せっしょく"
    },
    common: {
      modeSecure: "モード：安全",
      protocolSecure: "プロトコル // 安全",
      liveFeed: "ライブフィード"
    },
    overlay: {
      systemJump: "システムジャンプ",
      hydraulicA: "/// 油圧A 閉鎖",
      hydraulicB: "/// 油圧B 閉鎖",
      secure: "安全"
    },
    entrance: {
      systemCheck: "システムチェック",
      biosVerified: "BIOS確認済み",
      neuralLink: "ニューラルリンク確立",
      memAlloc: "メモリアロケーションOK",
      accessGranted: "アクセス許可",
      initializing: "初期化中...",
      decrypting: "キーを解読中...",
      authorized: "アクセス承認",
      coreOnline: "コア：オンライン",
      secureBoot: "セキュアブート：真"
    },
    about: {
      title: "人員 //ファイル",
      operative: "工作員：",
      role: "フルスタック開発者 & UIエンジニア。",
      description: "高忠実度のデジタルインターフェースと堅牢なバックエンドシステムの構築に特化。パフォーマンスの最適化と産業美学の統合に焦点を当てる。厳格な技術基準を満たすソリューションを展開。",
      skillsTitle: "戦闘モジュール (スキル)"
    },
    project: {
      header: "/// 安全なアーカイブ ///",
      title: "ミッションログ",
      searchPlaceholder: "プロジェクト検索 //",
      preview: "// プレビュー",
      viewBtn: "リンクを初期化",
      notFound: "[エラー]: レコードが見つかりません // クエリを確認",
      status: {
        complete: "完了",
        inProgress: "進行中",
        online: "オンライン"
      }
    },
    contact: {
      uplinkReady: "アップリンク準備完了",
      busy: "// ビジー",
      title: "送信",
      subtitle: "/// 暗号化チャンネルオープン ///",
      nameLabel: "コードネームID",
      namePlace: "識別子を入力",
      emailLabel: "周波数MOD (メール)",
      emailPlace: "周波数を入力",
      msgLabel: "データパケット (メッセージ)",
      msgPlace: "データストリームを入力...",
      listening: "[ リスニング ]",
      sendBtn: "アップロード開始",
      sending: "暗号化して送信中...",
      successTitle: "/// 送信完了 ///",
      successMsg: "データパケットがサーバーに安全にアップロードされました。ハンドシェイク応答を待っています。"
    }
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('appLanguage') || 'en';
  });

  useEffect(() => {
      localStorage.setItem('appLanguage', language);
  }, [language]);

  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    for (let key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
