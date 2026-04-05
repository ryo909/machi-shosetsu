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
  {
    relation_id: "rel_kinosaki_nite",
    spot_id: "spot_kinosaki_onsen",
    work_id: "work_kinosaki_nite",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "この町の静けさそのものが、生と死を見つめる視線の土台になった一冊。",
    detail_intro:
      "温泉街の穏やかな景色の中で、生き延びた感覚と死の近さが静かに並び立ちます。城崎をただの湯の町で終わらせない入口として強い作品です。",
    why_here: "志賀直哉の代表作として、町そのものから読む導線が非常に強い。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_kinosaki_saiban",
    spot_id: "spot_kinosaki_onsen",
    work_id: "work_kinosaki_saiban",
    relation_type: "major_scene",
    confidence_label: "medium",
    is_anchor: false,
    display_rank: 2,
    card_copy:
      "志賀直哉の足跡を追いながら、城崎の温泉街をもう一度物語化した現代作。",
    detail_intro:
      "古典的な文学の町という顔だけでなく、現代の作家が再び城崎を読み直していることも伝わる一冊です。",
    why_here: "城崎を再訪・再解釈する導線として相性がよい。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_kinosaki_e_kaeru",
    spot_id: "spot_kinosaki_onsen",
    work_id: "work_kinosaki_e_kaeru",
    relation_type: "major_scene",
    confidence_label: "medium",
    is_anchor: false,
    display_rank: 3,
    card_copy:
      "帰る場所としての城崎を描き、温泉街に記憶と再訪の感情を重ねる一冊。",
    detail_intro:
      "文学の町としての城崎に、現代的な喪失感と再訪の気持ちを重ねて読める作品です。",
    why_here:
      "城崎を“行く場所”ではなく“帰る場所”として読む視点がスポット体験に厚みを出す。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_amagi_izu_no_odoriko",
    spot_id: "spot_amagi_kawazu",
    work_id: "work_izu_no_odoriko",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "峠道と滝への道の気配そのものが、旅と別れの感情を支える代表作。",
    detail_intro:
      "旧街道や旧天城トンネル、河津七滝へ続く風景を歩くと、旅の一瞬がそのまま物語になる感覚がつかみやすくなります。",
    why_here: "場所そのものが作品の空気をつくる強いアンカー。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_amagi_goe",
    spot_id: "spot_amagi_kawazu",
    work_id: "work_amagi_goe",
    relation_type: "major_scene",
    confidence_label: "strong",
    is_anchor: false,
    display_rank: 2,
    card_copy:
      "同じ峠道に、今度は旅情ではなく濃い記憶と翳りを重ねて読む一冊。",
    detail_intro:
      "明るい旅の気分だけでなく、山道に残る影や人の記憶の濃さまで感じたいときに開きたくなる作品です。",
    why_here: "同じ場所を別の温度で読める2本目として機能する。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_hongo_sanshiro",
    spot_id: "spot_hongo_sanshiroike",
    work_id: "work_sanshiro",
    relation_type: "major_scene",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "池の静けさから、東京で揺れる青年の視線と感情に入っていく代表作。",
    detail_intro:
      "大学の空気と池の落ち着きが同居するこの場所は、青春の迷いや知的なざわめきを読む入口として強いスポットです。",
    why_here: "本郷の学生街らしさと作品の相性が非常によい。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_outen_kusamakura",
    spot_id: "spot_outen_onsen",
    work_id: "work_kusamakura",
    relation_type: "model_place",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "旅の途中で立ち止まり、風景を見ながら考え込む感覚をそのまま受け取れる一冊。",
    detail_intro:
      "小天温泉の静けさは、景色を眺めながら思索を深める『草枕』の入口として非常に相性が良いです。",
    why_here: "旅と温泉と美意識が自然につながる。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_sotome_chinmoku",
    spot_id: "spot_sotome_nagasaki",
    work_id: "work_chinmoku",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "海辺の静けさと信仰の重さが、もっとも強く結びつく長編。",
    detail_intro:
      "景色は開けているのに、歴史と祈りの重さが深く残る土地です。風景の美しさと苦悩が同時に迫る作品として、場所から入る価値があります。",
    why_here: "土地の重さと作品の主題が強く響き合う。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_karuizawa_kaze_tachinu",
    spot_id: "spot_karuizawa_oldkaruizawa_oiwake",
    work_id: "work_kaze_tachinu",
    relation_type: "major_scene",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "軽井沢の澄んだ空気と別れの気配を、もっとも強く結びつけて読める一冊。",
    detail_intro:
      "避暑地の明るさの中に、死の影や別れの余韻が静かに差し込んでくる作品です。軽井沢をただ爽やかな高原ではなく、心の奥行きまで響く場所として読めます。",
    why_here: "高原の空気から入る堀辰雄作品として最も使いやすい。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_karuizawa_utsukushii_mura",
    spot_id: "spot_karuizawa_oldkaruizawa_oiwake",
    work_id: "work_utsukushii_mura",
    relation_type: "popular_association",
    confidence_label: "medium",
    is_anchor: false,
    display_rank: 2,
    card_copy:
      "軽井沢ゆかりの代表作として、高原の気配から堀辰雄に入る入口になる一冊。",
    detail_intro:
      "避暑地の軽やかさだけでなく、感受性の細やかな揺れまで高原の空気とともに味わえる作品です。",
    why_here: "軽井沢の明るい表情を受け止めやすい2本目。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_karuizawa_naoko",
    spot_id: "spot_karuizawa_oldkaruizawa_oiwake",
    work_id: "work_naoko",
    relation_type: "popular_association",
    confidence_label: "medium",
    is_anchor: false,
    display_rank: 3,
    card_copy:
      "静かな土地の空気の中で、愛と病いの影をゆっくり深めていく一冊。",
    detail_intro:
      "軽井沢の静けさや距離感が、人物の感情を強く叫ばせずに支えているように読める作品です。",
    why_here: "堀辰雄ラインを厚くする補助作品として有効。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_magome_yoake_mae",
    spot_id: "spot_magome_juku",
    work_id: "work_yoake_mae",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "宿場町そのものが、時代の揺れと人の生を支える中心舞台になった代表作。",
    detail_intro:
      "馬籠の坂や本陣のたたずまいは、風景以上に時代の重さを感じさせます。歩きながら読むと、物語の背景ではなく現場として立ち上がるタイプの一冊です。",
    why_here: "場所と作品の結びつきが非常にわかりやすい。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_kanazawa_giketsu_kyoketsu",
    spot_id: "spot_kanazawa_higashi_umenobashi",
    work_id: "work_giketsu_kyoketsu",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "梅ノ橋と浅野川の気配から、そのまま情念と運命の物語へ入っていける一冊。",
    detail_intro:
      "川沿いの湿った空気と花街の余韻が、作品の濃い情感にそのままつながります。金沢の夜の気配から文学へ入る入口として強い作品です。",
    why_here: "川と花街の空気を作品側から受け取りやすい。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_kanazawa_sowa",
    spot_id: "spot_kanazawa_higashi_umenobashi",
    work_id: "work_sowa",
    relation_type: "major_scene",
    confidence_label: "medium",
    is_anchor: false,
    display_rank: 2,
    card_copy:
      "同じ花街の空気を、今度は生活の手触りに寄せて読み直せる短編。",
    detail_intro:
      "華やかさよりも、町に生きる人の距離感や暮らしの気配が前に出る作品です。金沢の文学を一段乾いた目線でも読めるようになります。",
    why_here: "金沢文学の幅を出せる補助作品。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_hozenji_meoto_zenzai",
    spot_id: "spot_osaka_hozenji_yokocho",
    work_id: "work_meoto_zenzai",
    relation_type: "major_scene",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "法善寺横丁の体温と、人のだめさ加減まで愛おしく読める大阪の代表作。",
    detail_intro:
      "にぎやかな横丁の奥にある、情けなさと愛嬌の混ざった大阪らしさが濃く残る作品です。町の匂いからそのまま読書に入れます。",
    why_here: "初見ユーザーにも結びつきが伝わりやすい。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_hanshinkan_sasameyuki",
    spot_id: "spot_hanshinkan_sumiyoshi_ashiyagawa",
    work_id: "work_sasameyuki",
    relation_type: "popular_association",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "阪神間の整った暮らしと季節の気配から、姉妹の物語に入るならまずこの一冊。",
    detail_intro:
      "華やかな事件より、会話や行事、住まいの空気で読ませる長編です。阪神間の上品な生活感を入口にすると、作品の温度がつかみやすくなります。",
    why_here: "街全体の空気から作品へ入る見せ方がきれい。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_shingu_misaki",
    spot_id: "spot_shingu_roji_kumanogawa",
    work_id: "work_misaki",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "新宮の路地の濃さと閉じた熱を、そのまま文学の強度に変えてしまう一冊。",
    detail_intro:
      "観光地としての明るさではなく、土地の重さや共同体の圧から読むタイプの作品です。アプリ全体の中でも、かなり濃い入口をつくれるスポットです。",
    why_here: "他スポットと違う密度の入口を作れる。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_kanagi_tsugaru",
    spot_id: "spot_kanagi_ashinokoen",
    work_id: "work_tsugaru",
    relation_type: "major_scene",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "赤い屋根の駅舎から、そのまま北の旅と土地の記憶へ入っていける太宰の一冊。",
    detail_intro:
      "金木から芦野公園駅にかけての空気は、観光地としてよりも、旅の途中で土地と向き合う感覚を強く残します。太宰の『津軽』を場所から読み直す入口として相性の良いスポットです。",
    why_here: "北の旅情から読む太宰として機能する。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_gassan_gassan",
    spot_id: "spot_gassan_churenji",
    work_id: "work_gassan",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "深い山の静けさと信仰の空気から、そのまま『月山』の世界へ入れる一冊。",
    detail_intro:
      "注連寺の静けさは、観光のにぎわいではなく、山の信仰と死生観の気配を前面に出してきます。重く静かな文学の入口として非常に強いスポットです。",
    why_here: "山と作品の結びつきが明快。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_tsuruoka_semi_shigure",
    spot_id: "spot_tsuruoka_uchikawa_jokamachi",
    work_id: "work_semi_shigure",
    relation_type: "model_place",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "城下町の川沿いを歩きながら、海坂藩の空気を最も想像しやすい代表作。",
    detail_intro:
      "鶴岡の町並みや内川の静けさは、藤沢周平作品の城下町の気配を立ち上げやすい風景です。景色の格や静かな緊張を味わいながら読む入口になります。",
    why_here: "城下町と作品世界の対応が作りやすい。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_tsuruoka_tasogare_seibei",
    spot_id: "spot_tsuruoka_uchikawa_jokamachi",
    work_id: "work_tasogare_seibei",
    relation_type: "popular_association",
    confidence_label: "medium",
    is_anchor: false,
    display_rank: 2,
    card_copy:
      "同じ鶴岡の静けさから、今度は暮らしの重みと余韻で藤沢周平に入る一冊。",
    detail_intro:
      "派手な場面より、暮らしや人のたたずまいを大切に読むなら、このスポットとも相性のよい代表作です。",
    why_here: "藤沢周平ラインの補助作品として自然。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_koza_takarajima",
    spot_id: "spot_okinawa_koza",
    work_id: "work_takarajima",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "コザの熱とざらつきを、そのまま長編の力に変えて読ませる現代沖縄小説。",
    detail_intro:
      "コザは、明るい観光地というより、戦後の熱と複雑さを抱えた街です。『宝島』はその温度ごと受け止められる強いアンカー作品になります。",
    why_here: "沖縄の街の熱量から入れる代表作。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_minamidaito_kaze_no_majimu",
    spot_id: "spot_minamidaito",
    work_id: "work_kaze_no_majimu",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "離島の風と挑戦の物語を、南大東島そのものから感じやすい一冊。",
    detail_intro:
      "本島とは違う島の速度や風景を入り口にできるので、沖縄のもう一つの顔としてとても入れやすいスポットです。",
    why_here: "コザとは違う沖縄の顔を追加できる。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_yuzawa_yukiguni",
    spot_id: "spot_echigo_yuzawa_yukigunikan",
    work_id: "work_yukiguni",
    relation_type: "main_stage",
    confidence_label: "strong",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "越後湯沢の温泉街から、そのまま『雪国』の静かな熱へ入っていける代表作。",
    detail_intro:
      "観光地としての明るさがありながら、少し歩くと雪国らしい静けさが前に出てきます。土地の空気から作品へ入る導線が非常に作りやすい一冊です。",
    why_here:
      "雪国館と温泉街の存在で、場所→作品導線が非常に強い。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_tono_gingatetsudo",
    spot_id: "spot_tono_miyamori_meganebashi",
    work_id: "work_gingatetsudo_no_yoru",
    relation_type: "popular_association",
    confidence_label: "medium",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "橋と列車の実景から、銀河鉄道の幻想へ自然に跳べる賢治の代表作。",
    detail_intro:
      "実在の橋を見ながら、それがそのまま幻想の入口にも感じられるスポットです。現実の風景と童話世界のあいだを行き来しやすいのが強みです。",
    why_here: "実景から作品へ想像を飛ばしやすい。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
  {
    relation_id: "rel_hanamaki_kaze_no_matasaburo",
    spot_id: "spot_hanamaki_ohasama_hayachine_kenji",
    work_id: "work_kaze_no_matasaburo",
    relation_type: "popular_association",
    confidence_label: "medium",
    is_anchor: true,
    display_rank: 1,
    card_copy:
      "山と風の気配から、『風の又三郎』の不思議な訪れを想像しやすい一冊。",
    detail_intro:
      "風そのものが土地の表情になっているような感覚があり、賢治の童話世界に入りやすいスポットです。実景をそのまま舞台と断定しないぶん、入口として上品に扱えます。",
    why_here: "風の感覚から作品へ入る導線が自然。",
    source_hint: "official",
    editor_note: null,
    status: "published",
  },
];
