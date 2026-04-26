### 마크다운 문서 요약

1.  **추상화 수준의 이해**: 한글의 구성(자음/모음 → 글자 → 단어 → 문장)을 비유로 들어, 코드에서도 동일한 수준의 구성 요소가 모여야 읽기 좋은 코드가 됨을 설명합니다.
2.  **문제 사례**: 하나의 커스텀 훅(`useThemeInfiniteScroll`)이 상태 관리, API 호출, Intersection Observer 설정 등 서로 다른 수준의 로직을 모두 포함하고 있어 발생하는 가독성 저하 문제를 지적합니다.
3.  **개선 방향**:
    * **Level 1**: 원자적 기능을 담당하는 기본 훅과 로직.
    * **Level 2**: 특정 책임을 가진 조합형 훅(`useThemeData`, `useInitThemeData` 등).
    * **Level 3**: 고수준의 기능을 제공하기 위해 Level 2 훅들을 조합하는 최종 훅.
4.  **핵심 원칙**: 같은 레벨끼리의 조합, 단일 책임 원칙 준수, 조합을 통한 확장성 확보를 강조합니다.

---

### 추상화 정렬하기 가이드 문서 (Markdown)

```markdown
# [클린코드 조각모음] 추상화를 정렬하기

이 문서는 React와 JavaScript를 사용한 프론트엔드 개발에서 코드의 의도를 명확히 하고 유지보수성을 높이기 위해 '추상화 수준'을 정렬하는 방법론을 정리합니다.

## 1. 추상화 수준의 개념 (언어적 비유)

좋은 코드는 한 편의 잘 쓰인 글과 같습니다. 글이 문단, 문장, 단어, 글자로 구성되듯이 코드도 동일한 추상화 레벨이 모여 더 높은 차원의 기능을 구성해야 합니다.


* **정상적인 추상화**: "안녕하세요 저는 개발자입니다." (단어들이 모여 문장을 구성)
* **깨진 추상화**: "안녕하세요ㅈㅓㄴㅡㄴㅎㅘㅇ준일ㅇㅣㅂ니다" (문장 수준과 자모 수준이 혼재됨)

추상화 수준이 정렬되지 않은 코드는 읽는 이로 하여금 낮은 수준의 로직을 머릿속에서 다시 조합하게 만들어 에너지를 소모하게 합니다.

## 2. 문제가 되는 코드 (Mixed Abstraction)

무한 스크롤을 구현하는 하나의 훅에서 서로 다른 수준의 로직이 섞여 있는 경우입니다.

```typescript
// useThemeInfiniteScroll.ts - 추상화 수준이 정렬되지 않은 예시
export function useThemeInfiniteScroll({ themeId, initialCursor = null, threshold = 0.5 }: ThemeInfiniteScrollOptions) {
  // Level 1: 기본 상태 관리
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  
  // Level 2: 고수준 커스텀 훅 사용
  const { data: initialData } = useSuspenseApiQuery<ThemeProductResponse>({ ... });

  // Level 1: 복잡하고 상세한 페이징 로직 (저수준 구현)
  const fetchNext = useCallback(async () => {
    // API 호출, 에러 처리, 데이터 가공 로직이 직접 노출됨
    // ... 중략 ...
  }, []);

  // Level 2: 외부 라이브러리 연동 훅
  useIntersectionObserver({ targetRef: observerRef, onIntersect: fetchNext, ... });

  return { products, observerRef, fetchNext };
}
```

위 코드는 `useState` 같은 저수준 API와 `useSuspenseApiQuery` 같은 고수준 추상화가 한 곳에 섞여 있어, 전체적인 맥락을 파악하기 어렵게 만듭니다.

## 3. 개선된 모습: 계층별 추상화 정렬

추상화 레벨을 명확히 분리하여, 각 훅이 단일 책임을 갖도록 구성합니다.


### Step 1) 원자적 기능을 담당하는 훅 (Level 2)
각각의 명확한 책임을 가진 작은 단위의 훅으로 분리합니다.

* `useInitThemeData`: 초기 데이터 패칭 전담
* `useInitNextThemeData`: 다음 페이지 데이터 쿼리 전담
* `useThemeData`: 테마 데이터 상태 관리 및 가공 로직 전담

### Step 2) 조합을 통한 기능 제공 (Level 3)
분리된 훅들을 같은 레벨에서 조합하여 최종 기능을 완성합니다.

```typescript
// useThemeInfiniteScroll.ts - 정렬된 추상화
export function useThemeInfiniteScroll({ themeId, initialCursor = null, threshold = 0.5 }: ThemeInfiniteScrollOptions) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Level 2 훅들을 같은 레벨에서 조합
  const { data: initialData } = useInitThemeData(themeId);
  const theme = useThemeData(initialData, initialCursor);
  const nextTheme = useInitNextThemeData(themeId, theme.cursor);

  const fetchNextTheme = useCallback(() => theme.fetchNext(nextTheme.refetch), [nextTheme.refetch, theme]);

  useIntersectionObserver({
    targetRef: observerRef,
    onIntersect: fetchNextTheme,
    enabled: theme.moreAvailable && !theme.loading && theme.data.length > 0,
    threshold,
  });

  return { ...theme, observerRef, fetchNext: fetchNextTheme };
}
```

## 4. 추상화 정렬의 핵심 원칙

1.  **같은 레벨끼리만 조합하자**: 훅 내부에서 저수준 로직(useState 직접 사용 등)과 고수준 로직(커스텀 훅 사용 등)을 섞지 않습니다.
2.  **명확한 단일 책임**: 각 훅은 "무엇을 하는가"에 대해 하나의 명확한 답을 줄 수 있어야 합니다.
3.  **조합을 통한 확장성**: 작은 블록(Atomic Hooks)을 조립하여 큰 기능(Composite Hooks)을 만듦으로써 재사용성을 높입니다.

## 5. 결론

좋은 코드는 자연어처럼 읽혀야 합니다. 각 훅이 레고 블록처럼 명확한 기능을 가지고, 이들이 조화롭게 조합될 때 코드의 의도가 분명해지며 유지보수가 쉬워집니다.
