export const EXAMPLE_SECTIONS = [
  {
    title: "변수와 조건문",
    count: 2,
    cards: [
      {
        title: "성인 판별기",
        description: "나이에 따라 성인 여부를 판별하는 기본적인 조건문 예제입니다.",
        code: [
          "나이 = 20",
          "",
          "만약 나이 >= 18 이면",
          '    "성인입니다" 보여주기',
          "아니면",
          '    "미성년자입니다" 보여주기',
        ],
        badge: null,
      },
      {
        title: "점수 등급",
        description: "점수에 따라 합격 여부를 결정하는 예제입니다.",
        code: ["점수 = 85", "", "만약 점수 >= 80 이면", '    "합격" 보여주기', "아니면", '    "불합격" 보여주기'],
        badge: null,
      },
    ],
  },
  {
    title: "반복문",
    count: 2,
    cards: [
      {
        title: "1부터 5까지 합계",
        description: "반복문을 사용하여 1부터 5까지의 누적 합을 계산합니다.",
        code: ["합계 = 0", "(1~5) 의 반복값 마다 반복", "    합계 = 합계 + 반복값", "합계 보여주기"],
        badge: "POPULAR",
      },
      {
        title: "숫자 나열",
        description: "범위 반복을 통해 숫자를 순서대로 출력합니다.",
        code: ["(1~10) 의 반복값 마다 반복", "    반복값 보여주기"],
        badge: null,
      },
    ],
  },
  {
    title: "함수",
    count: 1,
    cards: [
      {
        title: "인사하기 함수",
        description: "함수를 정의하고 호출하여 이름을 포함한 인사를 출력합니다.",
        code: ["약속, (이름) 인사하기", '    이름 + "님, 반갑습니다!" 보여주기', "", '"철수" 인사하기'],
        badge: null,
      },
    ],
  },
  {
    title: "리스트",
    count: 1,
    cards: [
      {
        title: "장바구니 목록",
        description: "리스트에 항목을 담고 하나씩 꺼내어 확인합니다.",
        code: ['장바구니 = ["사과", "배", "포도"]', "장바구니 의 항목 마다 반복", "    항목 보여주기"],
        badge: "NEW",
      },
    ],
  },
] as const;
