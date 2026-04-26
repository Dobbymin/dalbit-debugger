import { PanelIcon, StepIcon, VariableIcon } from "@/shared";

export const FEATURE_CARDS = [
  {
    Icon: StepIcon,
    title: "단계별 실행",
    description:
      "코드를 한 줄씩 실행하며 프로그램 상태 변화를 정밀하게 추적합니다. 논리 오류를 빠르게 찾아내는 데 최적화되어 있습니다.",
  },
  {
    Icon: VariableIcon,
    title: "실시간 변수 추적",
    description:
      "현재 스코프의 변수 값을 실행 단계와 함께 갱신해 보여줍니다. 데이터 구조 변화가 눈에 보이도록 설계했습니다.",
  },
  {
    Icon: PanelIcon,
    title: "학습 친화적 UI",
    description:
      "교육자와 학습자 모두를 위한 패널 중심 화면입니다. 코드와 상태를 같은 시야에서 읽어 이해 속도를 높입니다.",
  },
] as const;

export const EDITOR_LINES = [
  { no: 1, code: "나이 : 20", isActive: false, indent: 0 },
  { no: 2, code: "만약 나이 >= 18 이면", isActive: true, indent: 0 },
  { no: 3, code: '"성인입니다" 보여주기', isActive: false, indent: 1 },
  { no: 4, code: "아니면", isActive: false, indent: 0 },
  { no: 5, code: '"미성년자입니다" 보여주기', isActive: false, indent: 1 },
] as const;
