/**
 * 저메추 (저녁 메뉴 추천) - 20개 메뉴 데이터셋
 */

const DELIVERY_LOCATION = {
  address: "스마트 큐레이션",
  areaName: "직장인 야근 메뉴 추천"
};

const MENU_DATA = [
  {
    id: 1,
    name: "1인 보쌈 정식",
    category: "korean",
    categoryName: "한식",
    calories: 780,
    price: "10,500원",
    deliveryTime: "20~35분",
    tags: ["든든한한끼", "고단백", "야근힐링"],
    description: "부드럽게 삶아낸 수육에 아삭한 무김치와 쌈채소가 어우러진 1인 가성비 정식",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "차돌 고기짬뽕 & 탕수육",
    category: "chinese",
    categoryName: "중식",
    calories: 850,
    price: "13,000원",
    deliveryTime: "25~40분",
    tags: ["얼큰한국물", "스트레스해소", "불맛가득"],
    description: "진한 불향 가득한 육수에 고소한 차돌박이와 바삭 쫄깃한 찹쌀 탕수육의 환상 조합",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "와퍼 세트 & 어니언링",
    category: "western",
    categoryName: "양식/버거",
    calories: 950,
    price: "9,900원",
    deliveryTime: "15~30분",
    tags: ["스피드", "육즙가득", "스테디셀러"],
    description: "직화로 구운 100% 순쇠고기 패티와 신선한 야채가 푸짐하게 들어간 버거의 정석",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "로제 떡볶이 & 모둠튀김",
    category: "snack",
    categoryName: "분식",
    calories: 1100,
    price: "12,000원",
    deliveryTime: "25~40분",
    tags: ["꾸덕꾸덕", "당충전", "동료와함께"],
    description: "매콤하면서도 부드러운 특제 크림소스와 쫀득한 쌀떡, 바삭한 튀김이 어우러진 맛",
    image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "소불고기 버섯 비빔밥",
    category: "korean",
    categoryName: "한식",
    calories: 620,
    price: "11,000원",
    deliveryTime: "20~35분",
    tags: ["속편한한끼", "균형잡힌영양", "깔끔한맛"],
    description: "달콤 짭조름한 양념 소불고기와 신선한 제철 나물, 버섯이 듬뿍 들어간 건강 한식",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "탄단지 웜볼 & 닭가슴살 샐러드",
    category: "salad",
    categoryName: "샐러드/라이트",
    calories: 380,
    price: "8,900원",
    deliveryTime: "25~40분",
    tags: ["다이어트", "가벼운속", "저칼로리"],
    description: "닭가슴살, 고구마, 견과류와 따뜻한 곡물이 들어가 영양 밸런스를 완벽하게 맞춘 식단",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    name: "모둠초밥 (10p) & 미니우동",
    category: "japanese",
    categoryName: "일식",
    calories: 550,
    price: "14,500원",
    deliveryTime: "25~40분",
    tags: ["신선한재료", "소확행", "퇴근기분"],
    description: "광어, 연어, 참치, 새우 등 신선한 활어로 정갈하게 쥔 특선 모둠 초밥 세트",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    name: "양지 쌀국수 & 짜조",
    category: "asian",
    categoryName: "아시안",
    calories: 590,
    price: "12,500원",
    deliveryTime: "20~35분",
    tags: ["뜨끈한국물", "속풀이", "호불호없는"],
    description: "14시간 푹 끓여낸 깊고 진한 소고기 육수에 부드러운 양지고기가 듬뿍 얹어진 쌀국수",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    name: "황금올리브 반반치킨",
    category: "snack",
    categoryName: "치킨/분식",
    calories: 1450,
    price: "23,000원",
    deliveryTime: "30~45분",
    tags: ["바삭바삭", "동료야근회식", "치킨은진리"],
    description: "엑스트라 버진 올리브유로 바삭하게 튀겨낸 크리스피 후라이드와 매콤달콤 양념치킨",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    name: "순대국밥 & 깍두기",
    category: "korean",
    categoryName: "한식",
    calories: 680,
    price: "8,900원",
    deliveryTime: "15~30분",
    tags: ["국밥부장관", "가성비최고", "든든한국물"],
    description: "사골을 24시간 우려낸 뽀얗고 구수한 육수에 쫄깃한 토종 순대와 머릿고기가 듬뿍",
    image: "https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    name: "이탈리안 비엠티 샌드위치",
    category: "western",
    categoryName: "샌드위치/양식",
    calories: 410,
    price: "7,400원",
    deliveryTime: "15~25분",
    tags: ["간편식", "직장인원픽", "산뜻한마무리"],
    description: "페퍼로니, 살라미, 햄이 신선한 채소와 어우러진 써브웨이 전 세계 베스트셀러",
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    name: "엽기떡볶이 착한맛 & 주먹김밥",
    category: "snack",
    categoryName: "분식",
    calories: 1250,
    price: "16,000원",
    deliveryTime: "25~45분",
    tags: ["스트레스순삭", "치즈폭탄", "야식감성"],
    description: "중독성 강한 매콤소스에 쫀득한 떡, 오뎅, 소시지, 자연산 모짜렐라 치즈가 듬뿍",
    image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 13,
    name: "치즈 등심돈까스 & 미니우동",
    category: "japanese",
    categoryName: "일식",
    calories: 890,
    price: "12,900원",
    deliveryTime: "20~35분",
    tags: ["바삭치즈", "겉바속촉", "프리미엄"],
    description: "국내산 1등급 생등심 속에 100% 모짜렐라 치즈가 흘러넘치는 프리미엄 일식 돈카츠",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 14,
    name: "순살 간장 안동찜닭",
    category: "korean",
    categoryName: "한식",
    calories: 980,
    price: "24,800원",
    deliveryTime: "30~45분",
    tags: ["납작당면", "밥도둑", "팀원나눔"],
    description: "특제 간장소스가 쏙 밴 부드러운 순살 닭다리살과 쫀득한 둥근당면, 감자의 꿀조합",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 15,
    name: "셀프 마라탕 & 꿔바로우",
    category: "chinese",
    categoryName: "중식",
    calories: 920,
    price: "15,000원",
    deliveryTime: "20~35분",
    tags: ["얼얼한맛", "취향존중", "중독성갑"],
    description: "땅콩 소스의 고소함과 얼얼한 사천 마라향이 조화를 이루는 한국인 취향저격 마라탕",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 16,
    name: "마제소바 (일본식 비빔라멘)",
    category: "japanese",
    categoryName: "일식",
    calories: 740,
    price: "11,000원",
    deliveryTime: "25~40분",
    tags: ["꾸덕감칠맛", "비빔면", "별미추천"],
    description: "특제 다진 고기 양념과 부추, 파, 노른자, 감칠맛 나는 어분을 쫄깃한 면에 비벼먹는 라멘",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 17,
    name: "큐브 스테이크 덮밥",
    category: "western",
    categoryName: "양식/덮밥",
    calories: 710,
    price: "12,900원",
    deliveryTime: "20~35분",
    tags: ["육즙팡팡", "직화구이", "간편든든"],
    description: "특제 소스를 발라 직화로 정성스럽게 구워낸 부드러운 소고기 큐브 스테이크 덮밥",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 18,
    name: "한우 육회비빔밥 정식",
    category: "korean",
    categoryName: "한식",
    calories: 630,
    price: "13,000원",
    deliveryTime: "20~35분",
    tags: ["신선육회", "영양만점", "고급한끼"],
    description: "당일 도축한 신선한 한우 육회와 아삭한 배, 상추, 특제 초고추장이 빚어낸 명품 비빔밥",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 19,
    name: "매운 크림 파스타 & 마늘빵",
    category: "western",
    categoryName: "양식",
    calories: 820,
    price: "9,500원",
    deliveryTime: "25~40분",
    tags: ["가성비양식", "매콤크림", "기분전환"],
    description: "고소한 생크림에 청양고추의 매콤함을 더해 느끼하지 않고 감칠맛 가득한 파스타",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 20,
    name: "제육볶음 & 된장국 도시락",
    category: "korean",
    categoryName: "한식",
    calories: 760,
    price: "7,500원",
    deliveryTime: "15~25분",
    tags: ["가성비끝판왕", "집밥감성", "초스피드"],
    description: "매콤달콤한 제육볶음과 구수한 된장국, 정갈한 반찬이 푸짐하게 담긴 직장인 도시락",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80"
  }
];
