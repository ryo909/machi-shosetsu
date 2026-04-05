import type { Relation } from "./types";

export const relations: Relation[] = [
  {
    relation_id: "rel_kinkaku_kinkakuji",
    spot_id: "spot_kinkakuji",
    work_id: "work_kinkakuji",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "金閣を前にしたときの眩しさと不穏さを、そのまま物語の入口として受け取れる一冊です。",
    detail_intro:
      "きらびやかな建物を見上げる体験が、そのまま作品の核に触れる導入になります。名所として眺めるだけでは見えない、美への執着や居心地の悪さまで意識されてきます。",
    why_here:
      "金閣の美しさを現地で受け取ってから読むと、主人公が抱える魅了と拒絶の両方が、抽象論ではなく体感として立ち上がります。",
    source_hint: null,
    editor_note: "この場所ならまずこれ、の代表格。",
    status: "published",
  },
  {
    relation_id: "rel_gion_koto",
    spot_id: "spot_gion_matsuri",
    work_id: "work_koto",
    relation_type: "major_scene",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "祇園祭の華やぎだけでなく、京都の季節の巡りごと味わいたいときにちょうどよい一冊です。",
    detail_intro:
      "祭りの高揚、町家のしつらえ、季節ごとの行事。その積み重ねが作品の空気をつくっています。京都を出来事ではなく、続いていく時間として読みたい人に向いています。",
    why_here:
      "祇園祭界隈を歩くと、古都が描く京都は観光名所の寄せ集めではなく、行事と生活が地続きの町だと実感しやすくなります。",
    source_hint: null,
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_kitayama_koto",
    spot_id: "spot_kitayama_cedar",
    work_id: "work_koto",
    relation_type: "model_place",
    confidence_label: "medium",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "華やかな都の表側ではなく、整えられた山の気配から京都の品を読みたくなる組み合わせです。",
    detail_intro:
      "北山杉のまっすぐな景色には、手入れされた美しさがあります。古都に流れる端正さや、言いすぎない情緒を別の角度から受け取りたいとき、この場所が効いてきます。",
    why_here:
      "北山杉の里に立つと、古都の魅力が祭りや名所だけでなく、日々整えられる風景の積み重ねにもあると見えてきます。",
    source_hint: null,
    editor_note: "京都の奥行きを感じたい人向け。",
    status: "published",
  },
  {
    relation_id: "rel_hase_yamanooto",
    spot_id: "spot_kamakura_hase",
    work_id: "work_yamanooto",
    relation_type: "model_place",
    confidence_label: "medium",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "海の近さと家々の静けさが同居する長谷の空気は、心の小さな揺れを読むのにちょうどいい。",
    detail_intro:
      "大きな事件より、会話の温度や沈黙の重さが気になる日に向く一冊です。長谷の路地や寺の気配と重ねると、作品の静かな感情の流れがいっそう鮮明になります。",
    why_here:
      "長谷の穏やかな景色は、山の音にある感情の微細な動きを受け止めやすくしてくれます。急がず歩くほど、作品のテンポと合ってきます。",
    source_hint: null,
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_hase_kyogen",
    spot_id: "spot_kamakura_hase",
    work_id: "work_kyogen_no_kami",
    relation_type: "popular_association",
    confidence_label: "medium",
    is_anchor: false,
    display_rank: 2,
    card_copy:
      "長谷の少し肩の力が抜けた空気には、太宰の可笑しみがひらりと似合います。",
    detail_intro:
      "厳かなだけではない鎌倉を味わいたいなら、少し戯画的で人間くさい読み味の短編が合います。散歩の途中に一編だけ読む感覚でも楽しめます。",
    why_here:
      "長谷には名所の近さと日常のゆるさが同居していて、芸や人間くささを描く太宰の調子が不思議と馴染みます。",
    source_hint: null,
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_shichiri_ningen",
    spot_id: "spot_shichirigahama",
    work_id: "work_ningen_shikkaku",
    relation_type: "major_scene",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "明るい海を前にして読むほど、太宰の孤独が言葉以上の温度で迫ってくる場所です。",
    detail_intro:
      "七里ヶ浜の開けた景色は爽やかですが、その広さがかえって内面を近づけることがあります。人間失格の切実さを、重すぎず、しかし軽くもしない距離で受け取りやすい場所です。",
    why_here:
      "海辺の解放感と、作品に流れる孤独感の落差が大きいほど、主人公の痛みが単なる暗さではなく、生きづらさとして見えてきます。",
    source_hint: null,
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_senkouji_anya",
    spot_id: "spot_onomichi_senkouji",
    work_id: "work_anya_koro",
    relation_type: "model_place",
    confidence_label: "medium",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "坂を上りながら考え込む時間が、そのまま自分の歩幅で読めるような尾道の一冊です。",
    detail_intro:
      "千光寺へ向かう途中は、視界が開いたり閉じたりを繰り返します。その変化が、思索を深めていく暗夜行路の読み心地とよく重なります。静かに向き合いたい日におすすめです。",
    why_here:
      "尾道の坂道は、身体が少し疲れるぶん考えごとが深まりやすい地形です。暗夜行路の長い内省と自然につながります。",
    source_hint: null,
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_senkouji_horoki",
    spot_id: "spot_onomichi_senkouji",
    work_id: "work_horoki",
    relation_type: "popular_association",
    confidence_label: "medium",
    is_anchor: false,
    display_rank: 2,
    card_copy:
      "坂道と生活の近さが残る尾道では、放浪記の移ろい続ける熱も生々しく読めます。",
    detail_intro:
      "尾道の情緒に寄せすぎず、働くことや居場所のなさまで感じ取りたいなら放浪記も良い相性です。観光地の顔の奥にある生活感が、作品の力を引き寄せます。",
    why_here:
      "千光寺まわりの路地には、旅情と生活感の両方があります。その混ざり方が、放浪記のエネルギーに通じます。",
    source_hint: null,
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_hondori_horoki",
    spot_id: "spot_onomichi_hondori",
    work_id: "work_horoki",
    relation_type: "major_scene",
    confidence_label: "medium",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "商店街の生活の匂いが、放浪記の切実さと前向きさをちょうど現実の側に引き戻します。",
    detail_intro:
      "気取らない通りを歩くと、旅情より先に人の暮らしが見えてきます。放浪記の魅力を、文学史ではなく生きる勢いとして受け取りたいなら、この周辺から入るのが自然です。",
    why_here:
      "本通り商店街周辺は、観光地の尾道よりも生活の気配を強く感じられます。放浪記の体温を身近に感じやすい場所です。",
    source_hint: null,
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_dogo_botchan",
    spot_id: "spot_dogo_onsen",
    work_id: "work_botchan",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "道後の旅気分と一緒に読むと、坊っちゃんの軽快さがぐっと身近になる定番の組み合わせです。",
    detail_intro:
      "作品に親しみはあるけれど、まだ読んでいない人にも入りやすい一冊です。温泉街を歩いたあとなら、土地に対する主人公の率直な反応や、旅先らしい高揚が自然に伝わってきます。",
    why_here:
      "道後温泉本館周辺の明るい観光地感は、坊っちゃんのテンポの良さと相性がよく、近代文学への入口としても無理がありません。",
    source_hint: null,
    editor_note: "MVPの中でも最も入りやすい導線。",
    status: "published",
  },
  {
    relation_id: "rel_otaru_yuki",
    spot_id: "spot_otaru_canal",
    work_id: "work_yuki_no_machi",
    relation_type: "model_place",
    confidence_label: "medium",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "小樽の冷えた空気と石造りの街並みが、作品の影の深さを静かに支えてくれます。",
    detail_intro:
      "賑やかすぎない港町を歩きたい日に合う一冊です。小樽の整った景観に少しの寂しさが混ざることで、幽鬼の街にある心理の陰影が、過度に難しくならずに届きます。",
    why_here:
      "旧市街から運河周辺にかけての空気には、観光地でありながら古い時間が残っています。作品の持つ北の都市の影とよく響き合います。",
    source_hint: null,
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_asakusa_onihei",
    spot_id: "spot_asakusa",
    work_id: "work_onihei",
    relation_type: "popular_association",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "浅草の賑わいを、江戸の粋と人情に置き換えて楽しみたいなら、まずは鬼平から入るのが自然です。",
    detail_intro:
      "観光地としての浅草だけでなく、商いと人の情が交わる町として味わいたいときに向く一作です。歩いたあとの食や会話まで含めて、江戸の空気が立ち上がってきます。",
    why_here:
      "浅草の人通りや店の連なりを見ると、鬼平犯科帳にある江戸の町の奥行きが、時代劇ではなく生活の場として見えてきます。",
    source_hint: null,
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_asakusa_kenkaku",
    spot_id: "spot_asakusa",
    work_id: "work_kenkaku",
    relation_type: "popular_association",
    confidence_label: "medium",
    is_anchor: false,
    display_rank: 2,
    card_copy:
      "少し落ち着いた下町歩きの気分なら、会話や食の余韻まで楽しめる剣客商売もよく似合います。",
    detail_intro:
      "浅草の喧騒を少し離れて、江戸の暮らしの機微をゆっくり楽しみたいときにおすすめです。切れ味より間合いを味わう読書時間がつくれます。",
    why_here:
      "浅草の裏通りや老舗の空気は、剣客商売の会話や食の場面に通じる落ち着きを感じさせます。",
    source_hint: null,
    editor_note: null,
    status: "published",
  },
];
