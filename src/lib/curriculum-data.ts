// src/lib/curriculum-data.ts
// 한국 수학 교육과정 기반 학년별 상세 커리큘럼

// 인터페이스를 먼저 export (다른 파일에서 import하기 전에 선언)
export interface Concept {
  id: string;
  name: string;
  description: string;
  xp: number;
  duration: string;
  difficulty: '기초' | '초급' | '중급' | '고급' | '심화' | '최상';
  prerequisites?: string[];
  learningObjectives: string[];
  keyFormulas?: string[];
  examples?: string[];
  videoUrl?: string;
}

export interface Unit {
  id: string;
  name: string;
  description: string;
  concepts: Concept[];
}

export interface GradeData {
  grade: number;
  units: Unit[];
}

export interface SchoolLevel {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  grades: GradeData[];
}

// 초등학교 1학년
const elementary1: GradeData = {
  grade: 1,
  units: [
    {
      id: 'e1-u1',
      name: '9까지의 수',
      description: '수의 기초를 배워요',
      concepts: [
        {
          id: 'e1-1-1', name: '1부터 5까지의 수', description: '1부터 5까지 수 세기와 읽기',
          xp: 20, duration: '8분', difficulty: '기초',
          learningObjectives: ['1~5까지 수를 셀 수 있다', '수를 읽고 쓸 수 있다'],
          examples: ['사과 3개 세기', '손가락으로 수 표현하기']
        },
        {
          id: 'e1-1-2', name: '6부터 9까지의 수', description: '6부터 9까지 수 세기와 읽기',
          xp: 20, duration: '8분', difficulty: '기초',
          learningObjectives: ['6~9까지 수를 셀 수 있다', '수의 순서를 알 수 있다'],
          examples: ['블록 7개 세기', '수 카드 배열하기']
        },
        {
          id: 'e1-1-3', name: '수의 순서', description: '1부터 9까지 수의 순서 알기',
          xp: 25, duration: '10분', difficulty: '기초',
          learningObjectives: ['수의 순서를 안다', '앞의 수, 뒤의 수를 찾을 수 있다'],
          examples: ['3 다음 수는?', '7 앞의 수는?']
        },
        {
          id: 'e1-1-4', name: '0 알아보기', description: '0의 개념 이해하기',
          xp: 25, duration: '10분', difficulty: '기초',
          learningObjectives: ['0의 의미를 안다', '아무것도 없음을 0으로 표현할 수 있다'],
          examples: ['빈 바구니는 0', '남은 사탕 0개']
        },
        {
          id: 'e1-1-5', name: '수의 크기 비교', description: '두 수의 크기를 비교해요',
          xp: 30, duration: '12분', difficulty: '기초',
          learningObjectives: ['두 수의 크기를 비교할 수 있다', '큰 수와 작은 수를 구분할 수 있다'],
          examples: ['5와 3 중 큰 수', '7과 9 중 작은 수']
        }
      ]
    },
    {
      id: 'e1-u2',
      name: '여러 가지 모양',
      description: '기본 도형을 배워요',
      concepts: [
        {
          id: 'e1-2-1', name: '네모 모양', description: '네모 모양 찾고 분류하기',
          xp: 20, duration: '8분', difficulty: '기초',
          learningObjectives: ['네모 모양을 찾을 수 있다', '네모 모양의 특징을 안다'],
          examples: ['창문', '책', '칠판']
        },
        {
          id: 'e1-2-2', name: '세모 모양', description: '세모 모양 찾고 분류하기',
          xp: 20, duration: '8분', difficulty: '기초',
          learningObjectives: ['세모 모양을 찾을 수 있다', '세모 모양의 특징을 안다'],
          examples: ['삼각 김밥', '옷걸이', '지붕']
        },
        {
          id: 'e1-2-3', name: '동그라미 모양', description: '동그라미 모양 찾고 분류하기',
          xp: 20, duration: '8분', difficulty: '기초',
          learningObjectives: ['동그라미 모양을 찾을 수 있다', '동그라미 모양의 특징을 안다'],
          examples: ['시계', '피자', '바퀴']
        },
        {
          id: 'e1-2-4', name: '모양 만들기', description: '여러 모양으로 새로운 모양 만들기',
          xp: 30, duration: '12분', difficulty: '초급',
          learningObjectives: ['모양을 조합하여 새로운 모양을 만들 수 있다'],
          examples: ['네모와 세모로 집 만들기', '동그라미로 눈사람 만들기']
        }
      ]
    },
    {
      id: 'e1-u3',
      name: '덧셈과 뺄셈',
      description: '수를 더하고 빼요',
      concepts: [
        {
          id: 'e1-3-1', name: '모으기', description: '두 수를 모아 세기',
          xp: 25, duration: '10분', difficulty: '기초',
          learningObjectives: ['두 묶음을 모아 셀 수 있다', '모으기의 개념을 이해한다'],
          examples: ['사과 2개와 3개 모으기']
        },
        {
          id: 'e1-3-2', name: '가르기', description: '한 수를 두 수로 가르기',
          xp: 25, duration: '10분', difficulty: '기초',
          learningObjectives: ['한 수를 두 수로 가를 수 있다', '가르기의 개념을 이해한다'],
          examples: ['5를 2와 3으로 가르기']
        },
        {
          id: 'e1-3-3', name: '덧셈 알아보기', description: '덧셈의 의미와 식 쓰기',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['덧셈의 의미를 안다', '덧셈식을 쓰고 읽을 수 있다'],
          keyFormulas: ['2 + 3 = 5'],
          examples: ['2와 3을 더하면 5']
        },
        {
          id: 'e1-3-4', name: '뺄셈 알아보기', description: '뺄셈의 의미와 식 쓰기',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['뺄셈의 의미를 안다', '뺄셈식을 쓰고 읽을 수 있다'],
          keyFormulas: ['5 - 2 = 3'],
          examples: ['5에서 2를 빼면 3']
        },
        {
          id: 'e1-3-5', name: '0이 있는 덧셈과 뺄셈', description: '0을 더하거나 빼기',
          xp: 30, duration: '10분', difficulty: '초급',
          learningObjectives: ['0을 더하거나 빼는 계산을 할 수 있다'],
          keyFormulas: ['5 + 0 = 5', '5 - 0 = 5', '5 - 5 = 0'],
          examples: ['어떤 수에 0을 더하면?']
        },
        {
          id: 'e1-3-6', name: '덧셈과 뺄셈 활용', description: '생활 속 덧셈과 뺄셈',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['생활 문제를 덧셈과 뺄셈으로 해결할 수 있다'],
          examples: ['사탕 3개를 먹으면 남은 개수는?']
        }
      ]
    },
    {
      id: 'e1-u4',
      name: '비교하기',
      description: '길이, 높이, 무게를 비교해요',
      concepts: [
        {
          id: 'e1-4-1', name: '길이 비교하기', description: '두 물건의 길이 비교',
          xp: 25, duration: '10분', difficulty: '기초',
          learningObjectives: ['두 물건의 길이를 비교할 수 있다'],
          examples: ['연필과 지우개 중 긴 것', '더 긴 줄 찾기']
        },
        {
          id: 'e1-4-2', name: '높이 비교하기', description: '두 물건의 높이 비교',
          xp: 25, duration: '10분', difficulty: '기초',
          learningObjectives: ['두 물건의 높이를 비교할 수 있다'],
          examples: ['건물의 높이 비교', '키 비교하기']
        },
        {
          id: 'e1-4-3', name: '무게 비교하기', description: '두 물건의 무게 비교',
          xp: 25, duration: '10분', difficulty: '기초',
          learningObjectives: ['두 물건의 무게를 비교할 수 있다'],
          examples: ['사과와 수박 중 무거운 것']
        },
        {
          id: 'e1-4-4', name: '넓이 비교하기', description: '두 물건의 넓이 비교',
          xp: 25, duration: '10분', difficulty: '기초',
          learningObjectives: ['두 물건의 넓이를 비교할 수 있다'],
          examples: ['책상과 공책 중 넓은 것']
        }
      ]
    },
    {
      id: 'e1-u5',
      name: '50까지의 수',
      description: '더 큰 수를 배워요',
      concepts: [
        {
          id: 'e1-5-1', name: '10 알아보기', description: '10의 개념 이해하기',
          xp: 30, duration: '12분', difficulty: '기초',
          learningObjectives: ['10의 개념을 안다', '10 모으기와 가르기를 할 수 있다'],
          examples: ['10개씩 묶기']
        },
        {
          id: 'e1-5-2', name: '십몇 알아보기', description: '11부터 19까지의 수',
          xp: 30, duration: '12분', difficulty: '초급',
          learningObjectives: ['11~19의 수를 읽고 쓸 수 있다'],
          examples: ['10과 3은 13']
        },
        {
          id: 'e1-5-3', name: '몇십 알아보기', description: '10, 20, 30, 40, 50',
          xp: 30, duration: '12분', difficulty: '초급',
          learningObjectives: ['10씩 뛰어 세기를 할 수 있다'],
          examples: ['10, 20, 30...']
        },
        {
          id: 'e1-5-4', name: '50까지의 수 세기', description: '50까지 수 세고 읽기',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['50까지의 수를 셀 수 있다', '수의 순서를 안다'],
          examples: ['35 다음 수는?', '42 앞의 수는?']
        },
        {
          id: 'e1-5-5', name: '수의 크기 비교', description: '두 자리 수의 크기 비교',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['두 자리 수의 크기를 비교할 수 있다'],
          examples: ['23과 32 중 큰 수']
        }
      ]
    }
  ]
};

// 초등학교 2학년
const elementary2: GradeData = {
  grade: 2,
  units: [
    {
      id: 'e2-u1',
      name: '세 자리 수',
      description: '100보다 큰 수를 배워요',
      concepts: [
        {
          id: 'e2-1-1', name: '100 알아보기', description: '100의 개념 이해하기',
          xp: 30, duration: '12분', difficulty: '초급',
          learningObjectives: ['100의 개념을 안다', '99 다음 수가 100임을 안다'],
          examples: ['10이 10개면 100']
        },
        {
          id: 'e2-1-2', name: '몇백 알아보기', description: '100, 200, ..., 900',
          xp: 30, duration: '12분', difficulty: '초급',
          learningObjectives: ['100씩 뛰어 세기를 할 수 있다'],
          examples: ['100이 5개면 500']
        },
        {
          id: 'e2-1-3', name: '세 자리 수 읽고 쓰기', description: '백의 자리, 십의 자리, 일의 자리',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['세 자리 수를 읽고 쓸 수 있다', '자릿값을 이해한다'],
          examples: ['354는 삼백오십사']
        },
        {
          id: 'e2-1-4', name: '뛰어 세기', description: '1, 10, 100씩 뛰어 세기',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['규칙적으로 뛰어 셀 수 있다'],
          examples: ['230, 240, 250, ...']
        },
        {
          id: 'e2-1-5', name: '수의 크기 비교', description: '세 자리 수의 크기 비교',
          xp: 40, duration: '15분', difficulty: '중급',
          learningObjectives: ['세 자리 수의 크기를 비교할 수 있다'],
          examples: ['458과 485 중 큰 수']
        }
      ]
    },
    {
      id: 'e2-u2',
      name: '덧셈과 뺄셈',
      description: '받아올림과 받아내림을 배워요',
      concepts: [
        {
          id: 'e2-2-1', name: '받아올림이 없는 덧셈', description: '일의 자리끼리 더하기',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['받아올림 없는 두 자리 수 덧셈을 할 수 있다'],
          keyFormulas: ['23 + 15 = 38'],
          examples: ['32 + 45']
        },
        {
          id: 'e2-2-2', name: '받아올림이 있는 덧셈', description: '일의 자리에서 받아올림',
          xp: 45, duration: '20분', difficulty: '중급',
          learningObjectives: ['받아올림이 있는 덧셈을 할 수 있다'],
          keyFormulas: ['28 + 15 = 43'],
          examples: ['37 + 25']
        },
        {
          id: 'e2-2-3', name: '받아내림이 없는 뺄셈', description: '일의 자리끼리 빼기',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['받아내림 없는 두 자리 수 뺄셈을 할 수 있다'],
          keyFormulas: ['48 - 23 = 25'],
          examples: ['67 - 34']
        },
        {
          id: 'e2-2-4', name: '받아내림이 있는 뺄셈', description: '십의 자리에서 받아내림',
          xp: 45, duration: '20분', difficulty: '중급',
          learningObjectives: ['받아내림이 있는 뺄셈을 할 수 있다'],
          keyFormulas: ['43 - 18 = 25'],
          examples: ['52 - 27']
        },
        {
          id: 'e2-2-5', name: '세 자리 수의 덧셈', description: '세 자리 수끼리 더하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['세 자리 수의 덧셈을 할 수 있다'],
          examples: ['234 + 152']
        },
        {
          id: 'e2-2-6', name: '세 자리 수의 뺄셈', description: '세 자리 수끼리 빼기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['세 자리 수의 뺄셈을 할 수 있다'],
          examples: ['456 - 123']
        },
        {
          id: 'e2-2-7', name: '덧셈과 뺄셈의 관계', description: '덧셈식을 뺄셈식으로',
          xp: 40, duration: '15분', difficulty: '중급',
          learningObjectives: ['덧셈과 뺄셈의 관계를 이해한다'],
          examples: ['3 + 5 = 8 → 8 - 5 = 3']
        }
      ]
    },
    {
      id: 'e2-u3',
      name: '곱셈구구',
      description: '곱셈을 배워요',
      concepts: [
        {
          id: 'e2-3-1', name: '곱셈의 의미', description: '같은 수를 여러 번 더하기',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['곱셈의 의미를 이해한다'],
          keyFormulas: ['3 × 4 = 3 + 3 + 3 + 3 = 12'],
          examples: ['사탕 3개씩 4봉지']
        },
        {
          id: 'e2-3-2', name: '2단 곱셈구구', description: '2 × 1부터 2 × 9까지',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['2단 곱셈구구를 외울 수 있다'],
          keyFormulas: ['2 × 1 = 2', '2 × 5 = 10', '2 × 9 = 18'],
          examples: ['2씩 묶기']
        },
        {
          id: 'e2-3-3', name: '3단 곱셈구구', description: '3 × 1부터 3 × 9까지',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['3단 곱셈구구를 외울 수 있다'],
          keyFormulas: ['3 × 3 = 9', '3 × 7 = 21'],
          examples: ['삼각형의 꼭짓점']
        },
        {
          id: 'e2-3-4', name: '4단 곱셈구구', description: '4 × 1부터 4 × 9까지',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['4단 곱셈구구를 외울 수 있다'],
          examples: ['바퀴 4개인 자동차']
        },
        {
          id: 'e2-3-5', name: '5단 곱셈구구', description: '5 × 1부터 5 × 9까지',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['5단 곱셈구구를 외울 수 있다'],
          keyFormulas: ['5 × 5 = 25'],
          examples: ['손가락 5개']
        },
        {
          id: 'e2-3-6', name: '6단 곱셈구구', description: '6 × 1부터 6 × 9까지',
          xp: 45, duration: '18분', difficulty: '중급',
          learningObjectives: ['6단 곱셈구구를 외울 수 있다'],
          examples: ['육각형의 변']
        },
        {
          id: 'e2-3-7', name: '7단 곱셈구구', description: '7 × 1부터 7 × 9까지',
          xp: 45, duration: '18분', difficulty: '중급',
          learningObjectives: ['7단 곱셈구구를 외울 수 있다'],
          keyFormulas: ['7 × 7 = 49'],
          examples: ['일주일은 7일']
        },
        {
          id: 'e2-3-8', name: '8단 곱셈구구', description: '8 × 1부터 8 × 9까지',
          xp: 45, duration: '18분', difficulty: '중급',
          learningObjectives: ['8단 곱셈구구를 외울 수 있다'],
          keyFormulas: ['8 × 8 = 64'],
          examples: ['문어 다리 8개']
        },
        {
          id: 'e2-3-9', name: '9단 곱셈구구', description: '9 × 1부터 9 × 9까지',
          xp: 45, duration: '18분', difficulty: '중급',
          learningObjectives: ['9단 곱셈구구를 외울 수 있다'],
          keyFormulas: ['9 × 9 = 81'],
          examples: ['야구는 9회']
        },
        {
          id: 'e2-3-10', name: '1단과 0의 곱', description: '1을 곱하기와 0을 곱하기',
          xp: 35, duration: '12분', difficulty: '초급',
          learningObjectives: ['1과 0의 곱셈 성질을 안다'],
          keyFormulas: ['a × 1 = a', 'a × 0 = 0'],
          examples: ['어떤 수에 1을 곱하면?']
        }
      ]
    },
    {
      id: 'e2-u4',
      name: '길이 재기',
      description: 'cm와 m를 배워요',
      concepts: [
        {
          id: 'e2-4-1', name: '1cm 알아보기', description: '센티미터의 개념',
          xp: 30, duration: '12분', difficulty: '초급',
          learningObjectives: ['1cm의 길이를 안다', '자로 길이를 잴 수 있다'],
          examples: ['손톱 너비가 약 1cm']
        },
        {
          id: 'e2-4-2', name: '길이 재기', description: '자를 사용하여 길이 재기',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['자를 사용하여 정확하게 길이를 잴 수 있다'],
          examples: ['연필 길이 재기', '책 가로 길이 재기']
        },
        {
          id: 'e2-4-3', name: '1m 알아보기', description: '미터의 개념',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['1m = 100cm 임을 안다'],
          keyFormulas: ['1m = 100cm'],
          examples: ['줄자로 교실 길이 재기']
        },
        {
          id: 'e2-4-4', name: '길이 어림하기', description: '길이를 어림하고 확인하기',
          xp: 40, duration: '15분', difficulty: '중급',
          learningObjectives: ['길이를 어림할 수 있다'],
          examples: ['책상 높이 어림하기']
        },
        {
          id: 'e2-4-5', name: '길이의 덧셈과 뺄셈', description: '길이 계산하기',
          xp: 45, duration: '18분', difficulty: '중급',
          learningObjectives: ['같은 단위의 길이를 더하고 뺄 수 있다'],
          examples: ['35cm + 48cm', '1m 20cm + 45cm']
        }
      ]
    },
    {
      id: 'e2-u5',
      name: '시각과 시간',
      description: '시계를 읽고 시간을 계산해요',
      concepts: [
        {
          id: 'e2-5-1', name: '몇 시 알아보기', description: '정각 읽기',
          xp: 25, duration: '10분', difficulty: '기초',
          learningObjectives: ['정각을 읽을 수 있다'],
          examples: ['3시', '12시']
        },
        {
          id: 'e2-5-2', name: '몇 시 30분 알아보기', description: '30분 단위로 읽기',
          xp: 30, duration: '12분', difficulty: '초급',
          learningObjectives: ['30분 단위 시각을 읽을 수 있다'],
          examples: ['4시 30분']
        },
        {
          id: 'e2-5-3', name: '몇 시 몇 분 알아보기', description: '5분 단위로 읽기',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['5분 단위 시각을 읽을 수 있다'],
          examples: ['7시 25분', '10시 45분']
        },
        {
          id: 'e2-5-4', name: '1분 알아보기', description: '1분 단위로 읽기',
          xp: 40, duration: '15분', difficulty: '중급',
          learningObjectives: ['1분 단위 시각을 읽을 수 있다'],
          examples: ['8시 17분']
        },
        {
          id: 'e2-5-5', name: '시간의 덧셈과 뺄셈', description: '시간 계산하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['시간을 더하고 뺄 수 있다'],
          examples: ['2시간 30분 + 1시간 45분']
        }
      ]
    }
  ]
};

// 초등학교 3학년
const elementary3: GradeData = {
  grade: 3,
  units: [
    {
      id: 'e3-u1',
      name: '덧셈과 뺄셈',
      description: '네 자리 수의 계산을 배워요',
      concepts: [
        {
          id: 'e3-1-1', name: '네 자리 수', description: '1000 이상의 수 알아보기',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['네 자리 수를 읽고 쓸 수 있다'],
          examples: ['2345는 이천삼백사십오']
        },
        {
          id: 'e3-1-2', name: '네 자리 수의 덧셈', description: '받아올림이 있는 덧셈',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['네 자리 수의 덧셈을 할 수 있다'],
          examples: ['2567 + 1348']
        },
        {
          id: 'e3-1-3', name: '네 자리 수의 뺄셈', description: '받아내림이 있는 뺄셈',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['네 자리 수의 뺄셈을 할 수 있다'],
          examples: ['5234 - 2876']
        },
        {
          id: 'e3-1-4', name: '덧셈과 뺄셈의 활용', description: '문장제 문제 풀기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['실생활 문제를 덧셈과 뺄셈으로 해결할 수 있다'],
          examples: ['학교에 남학생 1234명, 여학생 1567명이면 전체 학생 수는?']
        }
      ]
    },
    {
      id: 'e3-u2',
      name: '나눗셈',
      description: '나눗셈의 개념을 배워요',
      concepts: [
        {
          id: 'e3-2-1', name: '똑같이 나누기', description: '나눗셈의 의미 알기',
          xp: 45, duration: '18분', difficulty: '초급',
          learningObjectives: ['나눗셈의 의미를 이해한다'],
          examples: ['12개를 3명이 똑같이 나누면?']
        },
        {
          id: 'e3-2-2', name: '나눗셈식 알아보기', description: '÷ 기호 사용하기',
          xp: 45, duration: '18분', difficulty: '초급',
          learningObjectives: ['나눗셈식을 읽고 쓸 수 있다'],
          keyFormulas: ['12 ÷ 3 = 4'],
          examples: ['나누어지는 수, 나누는 수, 몫']
        },
        {
          id: 'e3-2-3', name: '곱셈과 나눗셈의 관계', description: '곱셈구구로 나눗셈하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['곱셈과 나눗셈의 관계를 안다'],
          keyFormulas: ['3 × 4 = 12 → 12 ÷ 3 = 4'],
          examples: ['곱셈구구를 거꾸로 활용']
        },
        {
          id: 'e3-2-4', name: '나머지가 있는 나눗셈', description: '나머지 구하기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['나머지가 있는 나눗셈을 할 수 있다'],
          keyFormulas: ['13 ÷ 4 = 3 ... 1'],
          examples: ['13개를 4명이 나누면?']
        },
        {
          id: 'e3-2-5', name: '나눗셈의 검산', description: '곱셈으로 검산하기',
          xp: 45, duration: '18분', difficulty: '중급',
          learningObjectives: ['나눗셈 결과를 검산할 수 있다'],
          keyFormulas: ['나누는 수 × 몫 + 나머지 = 나누어지는 수'],
          examples: ['13 ÷ 4 = 3...1 → 4 × 3 + 1 = 13']
        }
      ]
    },
    {
      id: 'e3-u3',
      name: '곱셈',
      description: '두 자리 수의 곱셈을 배워요',
      concepts: [
        {
          id: 'e3-3-1', name: '(몇십) × (몇)', description: '10의 배수 곱하기',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['10의 배수의 곱셈을 할 수 있다'],
          keyFormulas: ['20 × 3 = 60'],
          examples: ['30 × 4', '50 × 2']
        },
        {
          id: 'e3-3-2', name: '(두 자리 수) × (한 자리 수)', description: '세로셈으로 곱셈하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['두 자리 수에 한 자리 수를 곱할 수 있다'],
          examples: ['23 × 4', '37 × 5']
        },
        {
          id: 'e3-3-3', name: '올림이 있는 곱셈', description: '받아올림하여 곱하기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['올림이 있는 곱셈을 할 수 있다'],
          examples: ['28 × 3', '45 × 6']
        },
        {
          id: 'e3-3-4', name: '(세 자리 수) × (한 자리 수)', description: '세 자리 수 곱셈',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['세 자리 수에 한 자리 수를 곱할 수 있다'],
          examples: ['234 × 5', '467 × 3']
        }
      ]
    },
    {
      id: 'e3-u4',
      name: '분수',
      description: '분수의 기초를 배워요',
      concepts: [
        {
          id: 'e3-4-1', name: '분수 알아보기', description: '전체를 똑같이 나누기',
          xp: 45, duration: '18분', difficulty: '초급',
          learningObjectives: ['분수의 의미를 이해한다'],
          examples: ['피자를 4조각으로 나누면 한 조각은 1/4']
        },
        {
          id: 'e3-4-2', name: '분모와 분자', description: '분수의 구조 알기',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['분모와 분자의 의미를 안다'],
          keyFormulas: ['분자/분모'],
          examples: ['3/4에서 4가 분모, 3이 분자']
        },
        {
          id: 'e3-4-3', name: '단위분수', description: '분자가 1인 분수',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['단위분수의 개념을 안다'],
          examples: ['1/2, 1/3, 1/4, 1/5']
        },
        {
          id: 'e3-4-4', name: '분수의 크기 비교', description: '같은 분모의 분수 비교',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['분모가 같은 분수의 크기를 비교할 수 있다'],
          examples: ['2/5와 4/5 중 큰 것']
        },
        {
          id: 'e3-4-5', name: '단위분수의 크기 비교', description: '분자가 1인 분수 비교',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['단위분수의 크기를 비교할 수 있다'],
          examples: ['1/3과 1/5 중 큰 것']
        }
      ]
    },
    {
      id: 'e3-u5',
      name: '들이와 무게',
      description: 'L, mL, kg, g를 배워요',
      concepts: [
        {
          id: 'e3-5-1', name: '들이 비교하기', description: '양의 많고 적음 비교',
          xp: 35, duration: '15분', difficulty: '초급',
          learningObjectives: ['들이를 비교할 수 있다'],
          examples: ['물병과 컵 중 더 많이 담을 수 있는 것']
        },
        {
          id: 'e3-5-2', name: '1L와 1mL', description: '들이의 단위 알기',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['1L = 1000mL임을 안다'],
          keyFormulas: ['1L = 1000mL'],
          examples: ['우유팩 1L', '약 한 스푼 5mL']
        },
        {
          id: 'e3-5-3', name: '들이의 덧셈과 뺄셈', description: '들이 계산하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['들이를 더하고 뺄 수 있다'],
          examples: ['2L 500mL + 1L 700mL']
        },
        {
          id: 'e3-5-4', name: '1kg과 1g', description: '무게의 단위 알기',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['1kg = 1000g임을 안다'],
          keyFormulas: ['1kg = 1000g'],
          examples: ['설탕 1kg', '동전 약 5g']
        },
        {
          id: 'e3-5-5', name: '무게의 덧셈과 뺄셈', description: '무게 계산하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['무게를 더하고 뺄 수 있다'],
          examples: ['3kg 200g + 1kg 900g']
        }
      ]
    }
  ]
};

// 중학교 1학년
const middle1: GradeData = {
  grade: 1,
  units: [
    {
      id: 'm1-u1',
      name: '정수와 유리수',
      description: '음수의 세계로!',
      concepts: [
        {
          id: 'm1-1-1', name: '정수의 개념', description: '양의 정수, 0, 음의 정수',
          xp: 60, duration: '25분', difficulty: '중급',
          learningObjectives: ['정수의 개념을 이해한다', '수직선에 정수를 나타낼 수 있다'],
          examples: ['+3, 0, -5']
        },
        {
          id: 'm1-1-2', name: '유리수의 개념', description: '분수로 나타낼 수 있는 수',
          xp: 65, duration: '28분', difficulty: '중급',
          learningObjectives: ['유리수의 정의를 안다'],
          keyFormulas: ['유리수 = 정수/정수 (분모 ≠ 0)'],
          examples: ['1/2, -3/4, 0.5']
        },
        {
          id: 'm1-1-3', name: '절댓값', description: '수직선에서 원점까지의 거리',
          xp: 60, duration: '25분', difficulty: '중급',
          learningObjectives: ['절댓값의 의미를 안다'],
          keyFormulas: ['|a| = a (a≥0)', '|a| = -a (a<0)'],
          examples: ['|3| = 3', '|-5| = 5']
        },
        {
          id: 'm1-1-4', name: '정수의 덧셈', description: '같은 부호, 다른 부호',
          xp: 70, duration: '30분', difficulty: '중급',
          learningObjectives: ['정수의 덧셈을 할 수 있다'],
          keyFormulas: ['(+3) + (+5) = +8', '(-3) + (-5) = -8', '(+3) + (-5) = -2'],
          examples: ['온도 변화 계산']
        },
        {
          id: 'm1-1-5', name: '정수의 뺄셈', description: '뺄셈을 덧셈으로',
          xp: 70, duration: '30분', difficulty: '중급',
          learningObjectives: ['정수의 뺄셈을 할 수 있다'],
          keyFormulas: ['a - b = a + (-b)'],
          examples: ['(+3) - (+5) = (+3) + (-5) = -2']
        },
        {
          id: 'm1-1-6', name: '정수의 곱셈', description: '부호 규칙 알기',
          xp: 75, duration: '32분', difficulty: '고급',
          learningObjectives: ['정수의 곱셈을 할 수 있다'],
          keyFormulas: ['(+) × (+) = (+)', '(-) × (-) = (+)', '(+) × (-) = (-)'],
          examples: ['(-3) × (-4) = 12']
        },
        {
          id: 'm1-1-7', name: '정수의 나눗셈', description: '곱셈과 같은 부호 규칙',
          xp: 75, duration: '32분', difficulty: '고급',
          learningObjectives: ['정수의 나눗셈을 할 수 있다'],
          keyFormulas: ['(+) ÷ (+) = (+)', '(-) ÷ (-) = (+)'],
          examples: ['(-12) ÷ (-3) = 4']
        },
        {
          id: 'm1-1-8', name: '혼합 계산', description: '덧셈, 뺄셈, 곱셈, 나눗셈 혼합',
          xp: 85, duration: '35분', difficulty: '고급',
          learningObjectives: ['사칙연산이 섞인 계산을 할 수 있다'],
          examples: ['(-3) × 4 + (-8) ÷ 2']
        }
      ]
    },
    {
      id: 'm1-u2',
      name: '문자와 식',
      description: '대수의 시작',
      concepts: [
        {
          id: 'm1-2-1', name: '문자의 사용', description: 'x, y로 수 나타내기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['문자를 사용하여 수를 나타낼 수 있다'],
          examples: ['나이가 x살이면 5년 후는 (x+5)살']
        },
        {
          id: 'm1-2-2', name: '곱셈 기호 생략', description: '문자식 표현 규칙',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['문자식 표현 규칙을 안다'],
          keyFormulas: ['a × b = ab', '1 × a = a', 'a ÷ b = a/b'],
          examples: ['3 × x = 3x']
        },
        {
          id: 'm1-2-3', name: '대입', description: '문자에 수 대입하기',
          xp: 60, duration: '25분', difficulty: '중급',
          learningObjectives: ['문자에 수를 대입하여 식의 값을 구할 수 있다'],
          examples: ['x=3일 때, 2x+1의 값']
        },
        {
          id: 'm1-2-4', name: '다항식', description: '항, 상수항, 계수',
          xp: 65, duration: '28분', difficulty: '중급',
          learningObjectives: ['다항식의 용어를 안다'],
          examples: ['3x² + 2x - 5에서 항, 계수, 상수항']
        },
        {
          id: 'm1-2-5', name: '동류항', description: '같은 문자, 같은 차수',
          xp: 60, duration: '25분', difficulty: '중급',
          learningObjectives: ['동류항을 찾을 수 있다'],
          examples: ['3x와 5x는 동류항']
        },
        {
          id: 'm1-2-6', name: '일차식의 덧셈과 뺄셈', description: '동류항끼리 계산',
          xp: 70, duration: '30분', difficulty: '고급',
          learningObjectives: ['일차식의 덧셈과 뺄셈을 할 수 있다'],
          examples: ['(3x + 2) + (5x - 4) = 8x - 2']
        },
        {
          id: 'm1-2-7', name: '일차식과 수의 곱셈, 나눗셈', description: '분배법칙',
          xp: 70, duration: '30분', difficulty: '고급',
          learningObjectives: ['일차식에 수를 곱하고 나눌 수 있다'],
          keyFormulas: ['a(b + c) = ab + ac'],
          examples: ['2(3x - 4) = 6x - 8']
        }
      ]
    },
    {
      id: 'm1-u3',
      name: '일차방정식',
      description: '미지수 구하기',
      concepts: [
        {
          id: 'm1-3-1', name: '방정식과 해', description: '등식과 방정식의 뜻',
          xp: 60, duration: '25분', difficulty: '중급',
          learningObjectives: ['방정식의 의미를 안다', '해의 의미를 안다'],
          examples: ['x + 3 = 7의 해는 x = 4']
        },
        {
          id: 'm1-3-2', name: '등식의 성질', description: '양변에 같은 수 더하기, 곱하기',
          xp: 65, duration: '28분', difficulty: '중급',
          learningObjectives: ['등식의 성질을 이용할 수 있다'],
          keyFormulas: ['a = b → a + c = b + c', 'a = b → ac = bc'],
          examples: ['x - 3 = 5 → x = 8']
        },
        {
          id: 'm1-3-3', name: '이항', description: '항을 이동하여 정리하기',
          xp: 70, duration: '30분', difficulty: '고급',
          learningObjectives: ['이항을 이용하여 방정식을 풀 수 있다'],
          examples: ['2x - 3 = x + 5 → x = 8']
        },
        {
          id: 'm1-3-4', name: '일차방정식 풀기', description: 'ax = b 형태로 정리',
          xp: 80, duration: '35분', difficulty: '고급',
          learningObjectives: ['일차방정식을 풀 수 있다'],
          examples: ['3x + 5 = 2x + 11']
        },
        {
          id: 'm1-3-5', name: '괄호가 있는 방정식', description: '분배법칙 활용',
          xp: 85, duration: '35분', difficulty: '고급',
          learningObjectives: ['괄호가 있는 방정식을 풀 수 있다'],
          examples: ['2(x - 3) = 4x + 2']
        },
        {
          id: 'm1-3-6', name: '계수가 분수인 방정식', description: '분모 없애기',
          xp: 90, duration: '38분', difficulty: '심화',
          learningObjectives: ['계수가 분수인 방정식을 풀 수 있다'],
          examples: ['x/2 + 1 = x/3 + 2']
        },
        {
          id: 'm1-3-7', name: '일차방정식의 활용', description: '문장제 문제 풀기',
          xp: 95, duration: '40분', difficulty: '심화',
          learningObjectives: ['실생활 문제를 방정식으로 해결할 수 있다'],
          examples: ['연속하는 두 홀수의 합이 48일 때']
        }
      ]
    },
    {
      id: 'm1-u4',
      name: '좌표평면과 그래프',
      description: '함수의 기초',
      concepts: [
        {
          id: 'm1-4-1', name: '좌표평면', description: 'x축, y축, 원점',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['좌표평면의 구조를 안다'],
          examples: ['제1사분면, 제2사분면, ...']
        },
        {
          id: 'm1-4-2', name: '순서쌍과 좌표', description: '(x, y) 나타내기',
          xp: 60, duration: '25분', difficulty: '중급',
          learningObjectives: ['점의 좌표를 읽고 나타낼 수 있다'],
          examples: ['점 A(3, 2)']
        },
        {
          id: 'm1-4-3', name: '함수의 뜻', description: '대응 관계',
          xp: 65, duration: '28분', difficulty: '중급',
          learningObjectives: ['함수의 의미를 이해한다'],
          examples: ['정사각형 한 변의 길이 x → 둘레 4x']
        },
        {
          id: 'm1-4-4', name: '함숫값', description: 'f(x) 표현법',
          xp: 65, duration: '28분', difficulty: '중급',
          learningObjectives: ['함숫값을 구할 수 있다'],
          keyFormulas: ['f(x) = 2x + 1일 때, f(3) = 7'],
          examples: ['f(2), f(-1) 구하기']
        },
        {
          id: 'm1-4-5', name: '그래프 그리기', description: '순서쌍을 점으로',
          xp: 70, duration: '30분', difficulty: '고급',
          learningObjectives: ['함수의 그래프를 그릴 수 있다'],
          examples: ['y = x + 1의 그래프']
        },
        {
          id: 'm1-4-6', name: '정비례와 반비례', description: 'y = ax, y = a/x',
          xp: 80, duration: '35분', difficulty: '고급',
          learningObjectives: ['정비례, 반비례 관계를 안다'],
          keyFormulas: ['y = ax (정비례)', 'y = a/x (반비례)'],
          examples: ['시간과 거리', '속력과 시간']
        }
      ]
    }
  ]
};

// 고등학교 1학년
const high1: GradeData = {
  grade: 1,
  units: [
    {
      id: 'h1-u1',
      name: '다항식',
      description: '다항식의 연산',
      concepts: [
        {
          id: 'h1-1-1', name: '다항식의 덧셈과 뺄셈', description: '동류항 정리',
          xp: 70, duration: '30분', difficulty: '고급',
          learningObjectives: ['다항식의 덧셈과 뺄셈을 할 수 있다'],
          examples: ['(3x² + 2x - 1) + (x² - 4x + 3)']
        },
        {
          id: 'h1-1-2', name: '다항식의 곱셈', description: '분배법칙 확장',
          xp: 80, duration: '35분', difficulty: '고급',
          learningObjectives: ['다항식끼리 곱할 수 있다'],
          examples: ['(2x + 3)(x - 1)']
        },
        {
          id: 'h1-1-3', name: '곱셈 공식', description: '완전제곱식, 합차공식',
          xp: 85, duration: '38분', difficulty: '심화',
          learningObjectives: ['곱셈 공식을 활용할 수 있다'],
          keyFormulas: ['(a+b)² = a² + 2ab + b²', '(a-b)² = a² - 2ab + b²', '(a+b)(a-b) = a² - b²'],
          examples: ['(x + 3)²', '(2x - 1)(2x + 1)']
        },
        {
          id: 'h1-1-4', name: '다항식의 나눗셈', description: '몫과 나머지',
          xp: 90, duration: '40분', difficulty: '심화',
          learningObjectives: ['다항식을 나눌 수 있다'],
          examples: ['(x³ + 2x² - 5x + 2) ÷ (x - 1)']
        },
        {
          id: 'h1-1-5', name: '조립제법', description: '간편한 나눗셈',
          xp: 85, duration: '38분', difficulty: '심화',
          learningObjectives: ['조립제법을 사용할 수 있다'],
          examples: ['(x³ - 3x + 2) ÷ (x - 2)']
        },
        {
          id: 'h1-1-6', name: '나머지 정리', description: 'f(a)가 나머지',
          xp: 90, duration: '40분', difficulty: '심화',
          learningObjectives: ['나머지 정리를 활용할 수 있다'],
          keyFormulas: ['f(x)를 (x-a)로 나눈 나머지 = f(a)'],
          examples: ['x³ - 2x + 1을 x - 1로 나눈 나머지']
        },
        {
          id: 'h1-1-7', name: '인수정리', description: '인수 판별',
          xp: 95, duration: '42분', difficulty: '심화',
          learningObjectives: ['인수정리를 활용할 수 있다'],
          keyFormulas: ['f(a) = 0 ↔ (x-a)는 f(x)의 인수'],
          examples: ['x³ - 6x² + 11x - 6의 인수분해']
        }
      ]
    },
    {
      id: 'h1-u2',
      name: '방정식과 부등식',
      description: '복잡한 방정식과 부등식',
      concepts: [
        {
          id: 'h1-2-1', name: '복잡한 일차방정식', description: '분수, 소수 계수',
          xp: 75, duration: '32분', difficulty: '고급',
          learningObjectives: ['복잡한 일차방정식을 풀 수 있다'],
          examples: ['0.3x - 0.2 = 0.1x + 0.4']
        },
        {
          id: 'h1-2-2', name: '연립일차방정식', description: '두 방정식 동시에',
          xp: 85, duration: '38분', difficulty: '고급',
          learningObjectives: ['연립일차방정식을 풀 수 있다'],
          examples: ['2x + y = 5, x - y = 1']
        },
        {
          id: 'h1-2-3', name: '이차방정식', description: 'ax² + bx + c = 0',
          xp: 90, duration: '40분', difficulty: '심화',
          learningObjectives: ['이차방정식을 풀 수 있다'],
          keyFormulas: ['x = (-b ± √(b²-4ac)) / 2a'],
          examples: ['x² - 5x + 6 = 0']
        },
        {
          id: 'h1-2-4', name: '판별식', description: '근의 개수 판별',
          xp: 90, duration: '40분', difficulty: '심화',
          learningObjectives: ['판별식을 활용할 수 있다'],
          keyFormulas: ['D = b² - 4ac', 'D > 0: 서로 다른 두 실근', 'D = 0: 중근', 'D < 0: 실근 없음'],
          examples: ['x² + 2x + k = 0이 중근을 가질 조건']
        },
        {
          id: 'h1-2-5', name: '이차방정식의 활용', description: '문장제 문제',
          xp: 100, duration: '45분', difficulty: '심화',
          learningObjectives: ['실생활 문제를 이차방정식으로 해결할 수 있다'],
          examples: ['연속하는 두 자연수의 곱이 72']
        },
        {
          id: 'h1-2-6', name: '일차부등식', description: '부등호의 방향',
          xp: 80, duration: '35분', difficulty: '고급',
          learningObjectives: ['일차부등식을 풀 수 있다'],
          keyFormulas: ['양변에 음수를 곱하면 부등호 방향 바뀜'],
          examples: ['2x - 3 > 5']
        },
        {
          id: 'h1-2-7', name: '연립일차부등식', description: '교집합 구하기',
          xp: 90, duration: '40분', difficulty: '심화',
          learningObjectives: ['연립일차부등식을 풀 수 있다'],
          examples: ['x - 1 > 0 이고 2x + 1 < 9']
        },
        {
          id: 'h1-2-8', name: '절댓값이 있는 방정식과 부등식', description: '경우 나누기',
          xp: 100, duration: '45분', difficulty: '최상',
          learningObjectives: ['절댓값이 있는 방정식과 부등식을 풀 수 있다'],
          examples: ['|x - 2| = 3', '|2x - 1| < 5']
        }
      ]
    },
    {
      id: 'h1-u3',
      name: '도형의 방정식',
      description: '좌표평면 위의 도형',
      concepts: [
        {
          id: 'h1-3-1', name: '두 점 사이의 거리', description: '피타고라스 정리 활용',
          xp: 70, duration: '30분', difficulty: '고급',
          learningObjectives: ['두 점 사이의 거리를 구할 수 있다'],
          keyFormulas: ['d = √((x₂-x₁)² + (y₂-y₁)²)'],
          examples: ['A(1, 2)와 B(4, 6) 사이의 거리']
        },
        {
          id: 'h1-3-2', name: '내분점과 외분점', description: '선분을 나누는 점',
          xp: 80, duration: '35분', difficulty: '고급',
          learningObjectives: ['내분점과 외분점의 좌표를 구할 수 있다'],
          keyFormulas: ['내분점: ((mx₂+nx₁)/(m+n), (my₂+ny₁)/(m+n))'],
          examples: ['A(1, 2), B(5, 8)을 1:3으로 내분하는 점']
        },
        {
          id: 'h1-3-3', name: '직선의 방정식', description: 'y = mx + n',
          xp: 85, duration: '38분', difficulty: '심화',
          learningObjectives: ['직선의 방정식을 구할 수 있다'],
          keyFormulas: ['기울기 m = (y₂-y₁)/(x₂-x₁)', 'y - y₁ = m(x - x₁)'],
          examples: ['기울기가 2이고 점 (1, 3)을 지나는 직선']
        },
        {
          id: 'h1-3-4', name: '두 직선의 관계', description: '평행과 수직',
          xp: 90, duration: '40분', difficulty: '심화',
          learningObjectives: ['두 직선의 관계를 파악할 수 있다'],
          keyFormulas: ['평행: m₁ = m₂', '수직: m₁ × m₂ = -1'],
          examples: ['y = 2x + 1과 수직인 직선의 기울기']
        },
        {
          id: 'h1-3-5', name: '점과 직선 사이의 거리', description: '공식 유도와 활용',
          xp: 95, duration: '42분', difficulty: '심화',
          learningObjectives: ['점과 직선 사이의 거리를 구할 수 있다'],
          keyFormulas: ['d = |ax₁ + by₁ + c| / √(a² + b²)'],
          examples: ['점 (2, 3)과 직선 3x + 4y - 5 = 0 사이의 거리']
        },
        {
          id: 'h1-3-6', name: '원의 방정식', description: '(x-a)² + (y-b)² = r²',
          xp: 100, duration: '45분', difficulty: '심화',
          learningObjectives: ['원의 방정식을 구할 수 있다'],
          keyFormulas: ['중심 (a, b), 반지름 r인 원: (x-a)² + (y-b)² = r²'],
          examples: ['중심 (2, -1), 반지름 3인 원의 방정식']
        },
        {
          id: 'h1-3-7', name: '원과 직선의 위치 관계', description: '교점의 개수',
          xp: 105, duration: '48분', difficulty: '최상',
          learningObjectives: ['원과 직선의 위치 관계를 판별할 수 있다'],
          examples: ['원 x² + y² = 4와 직선 y = x + k의 위치 관계']
        }
      ]
    },
    {
      id: 'h1-u4',
      name: '집합과 명제',
      description: '논리적 사고의 기초',
      concepts: [
        {
          id: 'h1-4-1', name: '집합의 뜻과 표현', description: '원소나열법, 조건제시법',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['집합을 표현할 수 있다'],
          examples: ['{1, 2, 3} = {x | x는 3 이하의 자연수}']
        },
        {
          id: 'h1-4-2', name: '부분집합', description: '포함 관계',
          xp: 65, duration: '28분', difficulty: '고급',
          learningObjectives: ['부분집합의 개념을 안다'],
          keyFormulas: ['A ⊂ B ↔ x ∈ A → x ∈ B'],
          examples: ['{1, 2} ⊂ {1, 2, 3}']
        },
        {
          id: 'h1-4-3', name: '집합의 연산', description: '합집합, 교집합, 여집합',
          xp: 75, duration: '32분', difficulty: '고급',
          learningObjectives: ['집합의 연산을 할 수 있다'],
          keyFormulas: ['A ∪ B', 'A ∩ B', 'Aᶜ'],
          examples: ['A = {1, 2, 3}, B = {2, 3, 4}일 때 A ∪ B, A ∩ B']
        },
        {
          id: 'h1-4-4', name: '집합의 원소의 개수', description: '포함-배제 원리',
          xp: 80, duration: '35분', difficulty: '심화',
          learningObjectives: ['집합의 원소의 개수를 구할 수 있다'],
          keyFormulas: ['n(A ∪ B) = n(A) + n(B) - n(A ∩ B)'],
          examples: ['n(A) = 10, n(B) = 8, n(A ∩ B) = 3일 때 n(A ∪ B)']
        },
        {
          id: 'h1-4-5', name: '명제와 조건', description: '참, 거짓 판별',
          xp: 70, duration: '30분', difficulty: '고급',
          learningObjectives: ['명제와 조건을 구분할 수 있다'],
          examples: ['x > 3은 조건, "모든 정수는 유리수이다"는 명제']
        },
        {
          id: 'h1-4-6', name: '명제의 역, 이, 대우', description: '논리적 관계',
          xp: 85, duration: '38분', difficulty: '심화',
          learningObjectives: ['명제의 역, 이, 대우를 구할 수 있다'],
          keyFormulas: ['p → q의 역: q → p', '이: ~p → ~q', '대우: ~q → ~p'],
          examples: ['원래 명제와 대우는 진리값이 같다']
        },
        {
          id: 'h1-4-7', name: '필요조건과 충분조건', description: '조건 사이의 관계',
          xp: 95, duration: '42분', difficulty: '심화',
          learningObjectives: ['필요조건과 충분조건을 판별할 수 있다'],
          keyFormulas: ['p → q이면, p는 충분조건, q는 필요조건'],
          examples: ['x = 2는 x² = 4의 충분조건']
        },
        {
          id: 'h1-4-8', name: '절대부등식의 증명', description: '산술-기하 평균',
          xp: 100, duration: '45분', difficulty: '최상',
          learningObjectives: ['절대부등식을 증명할 수 있다'],
          keyFormulas: ['(a+b)/2 ≥ √(ab) (a, b > 0)'],
          examples: ['a² + b² ≥ 2ab 증명']
        }
      ]
    }
  ]
};

// 초등학교 4학년
const elementary4: GradeData = {
  grade: 4,
  units: [
    {
      id: 'e4-u1',
      name: '큰 수',
      description: '만, 억, 조 단위의 수를 배워요',
      concepts: [
        {
          id: 'e4-1-1', name: '만 알아보기', description: '10000의 개념 이해하기',
          xp: 40, duration: '15분', difficulty: '초급',
          learningObjectives: ['만의 개념을 안다', '1000이 10개이면 10000(만)임을 안다'],
          examples: ['10000원짜리 지폐']
        },
        {
          id: 'e4-1-2', name: '십만, 백만, 천만', description: '더 큰 수 알아보기',
          xp: 45, duration: '18분', difficulty: '초급',
          learningObjectives: ['십만, 백만, 천만의 크기를 안다'],
          examples: ['100000, 1000000, 10000000']
        },
        {
          id: 'e4-1-3', name: '억과 조', description: '아주 큰 수 알아보기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['억과 조의 크기를 안다', '큰 수를 읽고 쓸 수 있다'],
          keyFormulas: ['1억 = 10000만', '1조 = 10000억'],
          examples: ['우리나라 인구 약 5천만', '국가 예산']
        },
        {
          id: 'e4-1-4', name: '뛰어 세기', description: '큰 수의 뛰어 세기',
          xp: 45, duration: '18분', difficulty: '초급',
          learningObjectives: ['만, 십만, 백만씩 뛰어 셀 수 있다'],
          examples: ['1000000, 2000000, 3000000, ...']
        },
        {
          id: 'e4-1-5', name: '수의 크기 비교', description: '큰 수의 크기 비교',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['자릿수가 다른 큰 수의 크기를 비교할 수 있다'],
          examples: ['23456789와 234567890 비교']
        }
      ]
    },
    {
      id: 'e4-u2',
      name: '곱셈과 나눗셈',
      description: '세 자리 수의 곱셈과 나눗셈',
      concepts: [
        {
          id: 'e4-2-1', name: '(세 자리 수) × (두 자리 수)', description: '세로셈으로 곱하기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['세 자리 수에 두 자리 수를 곱할 수 있다'],
          examples: ['234 × 56']
        },
        {
          id: 'e4-2-2', name: '곱셈의 활용', description: '실생활 곱셈 문제',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['곱셈을 이용하여 실생활 문제를 해결할 수 있다'],
          examples: ['한 상자에 24개씩 15상자']
        },
        {
          id: 'e4-2-3', name: '(두 자리 수) ÷ (두 자리 수)', description: '나눗셈 익히기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['두 자리 수끼리 나눌 수 있다'],
          examples: ['84 ÷ 21']
        },
        {
          id: 'e4-2-4', name: '(세 자리 수) ÷ (두 자리 수)', description: '더 큰 수 나누기',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['세 자리 수를 두 자리 수로 나눌 수 있다'],
          examples: ['468 ÷ 12']
        },
        {
          id: 'e4-2-5', name: '나눗셈의 활용', description: '실생활 나눗셈 문제',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['나눗셈을 이용하여 실생활 문제를 해결할 수 있다'],
          examples: ['156개를 12명이 나누면?']
        }
      ]
    },
    {
      id: 'e4-u3',
      name: '분수의 덧셈과 뺄셈',
      description: '같은 분모의 분수 계산',
      concepts: [
        {
          id: 'e4-3-1', name: '진분수, 가분수, 대분수', description: '분수의 종류 알기',
          xp: 45, duration: '18분', difficulty: '초급',
          learningObjectives: ['진분수, 가분수, 대분수를 구분할 수 있다'],
          examples: ['2/3(진분수)', '5/3(가분수)', '1과 2/3(대분수)']
        },
        {
          id: 'e4-3-2', name: '대분수를 가분수로', description: '분수 변환하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['대분수와 가분수를 서로 바꿀 수 있다'],
          keyFormulas: ['2와 1/3 = 7/3'],
          examples: ['3과 2/5를 가분수로']
        },
        {
          id: 'e4-3-3', name: '분모가 같은 분수의 덧셈', description: '분자끼리 더하기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['분모가 같은 분수를 더할 수 있다'],
          keyFormulas: ['a/c + b/c = (a+b)/c'],
          examples: ['2/7 + 3/7']
        },
        {
          id: 'e4-3-4', name: '분모가 같은 분수의 뺄셈', description: '분자끼리 빼기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['분모가 같은 분수를 뺄 수 있다'],
          keyFormulas: ['a/c - b/c = (a-b)/c'],
          examples: ['5/8 - 2/8']
        },
        {
          id: 'e4-3-5', name: '대분수의 덧셈과 뺄셈', description: '대분수끼리 계산',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['대분수의 덧셈과 뺄셈을 할 수 있다'],
          examples: ['2와 3/5 + 1과 4/5']
        }
      ]
    },
    {
      id: 'e4-u4',
      name: '소수',
      description: '소수의 개념과 계산',
      concepts: [
        {
          id: 'e4-4-1', name: '소수 알아보기', description: '소수의 개념 이해',
          xp: 45, duration: '18분', difficulty: '초급',
          learningObjectives: ['소수의 의미를 안다', '소수를 읽고 쓸 수 있다'],
          examples: ['0.1, 0.5, 1.2']
        },
        {
          id: 'e4-4-2', name: '소수의 자릿값', description: '소수점 아래 자릿값',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['소수 첫째 자리, 둘째 자리, 셋째 자리를 안다'],
          examples: ['3.456에서 각 자리의 값']
        },
        {
          id: 'e4-4-3', name: '소수의 크기 비교', description: '소수끼리 비교하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['소수의 크기를 비교할 수 있다'],
          examples: ['0.45와 0.5 비교']
        },
        {
          id: 'e4-4-4', name: '소수의 덧셈', description: '소수점을 맞추어 더하기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['소수의 덧셈을 할 수 있다'],
          examples: ['2.35 + 1.48']
        },
        {
          id: 'e4-4-5', name: '소수의 뺄셈', description: '소수점을 맞추어 빼기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['소수의 뺄셈을 할 수 있다'],
          examples: ['5.67 - 2.34']
        }
      ]
    },
    {
      id: 'e4-u5',
      name: '삼각형과 사각형',
      description: '도형의 성질과 분류',
      concepts: [
        {
          id: 'e4-5-1', name: '이등변삼각형', description: '두 변의 길이가 같은 삼각형',
          xp: 45, duration: '18분', difficulty: '초급',
          learningObjectives: ['이등변삼각형의 성질을 안다'],
          examples: ['두 밑각의 크기가 같다']
        },
        {
          id: 'e4-5-2', name: '정삼각형', description: '세 변의 길이가 같은 삼각형',
          xp: 45, duration: '18분', difficulty: '초급',
          learningObjectives: ['정삼각형의 성질을 안다'],
          examples: ['세 각이 모두 60도']
        },
        {
          id: 'e4-5-3', name: '예각삼각형, 둔각삼각형', description: '각에 따른 삼각형 분류',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['각의 크기에 따라 삼각형을 분류할 수 있다'],
          examples: ['세 각이 모두 예각 / 한 각이 둔각']
        },
        {
          id: 'e4-5-4', name: '직사각형과 정사각형', description: '사각형의 성질',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['직사각형과 정사각형의 성질을 안다'],
          examples: ['네 각이 모두 직각']
        },
        {
          id: 'e4-5-5', name: '평행사변형', description: '마주 보는 변이 평행',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['평행사변형의 성질을 안다'],
          examples: ['마주 보는 변의 길이가 같다']
        },
        {
          id: 'e4-5-6', name: '마름모와 사다리꼴', description: '다양한 사각형',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['마름모와 사다리꼴의 성질을 안다'],
          examples: ['마름모는 네 변의 길이가 같다']
        }
      ]
    }
  ]
};

// 초등학교 5학년
const elementary5: GradeData = {
  grade: 5,
  units: [
    {
      id: 'e5-u1',
      name: '약수와 배수',
      description: '수의 관계를 배워요',
      concepts: [
        {
          id: 'e5-1-1', name: '약수 알아보기', description: '어떤 수를 나누어떨어지게 하는 수',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['약수의 의미를 안다', '약수를 구할 수 있다'],
          examples: ['12의 약수: 1, 2, 3, 4, 6, 12']
        },
        {
          id: 'e5-1-2', name: '배수 알아보기', description: '어떤 수를 곱한 수',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['배수의 의미를 안다', '배수를 구할 수 있다'],
          examples: ['5의 배수: 5, 10, 15, 20, ...']
        },
        {
          id: 'e5-1-3', name: '공약수와 최대공약수', description: '공통인 약수 중 가장 큰 수',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['공약수와 최대공약수를 구할 수 있다'],
          keyFormulas: ['12와 18의 최대공약수 = 6'],
          examples: ['약분에 활용']
        },
        {
          id: 'e5-1-4', name: '공배수와 최소공배수', description: '공통인 배수 중 가장 작은 수',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['공배수와 최소공배수를 구할 수 있다'],
          keyFormulas: ['4와 6의 최소공배수 = 12'],
          examples: ['통분에 활용']
        },
        {
          id: 'e5-1-5', name: '약수와 배수의 활용', description: '실생활 문제 해결',
          xp: 55, duration: '22분', difficulty: '고급',
          learningObjectives: ['약수와 배수를 활용하여 문제를 해결할 수 있다'],
          examples: ['가장 큰 정사각형 타일로 바닥 채우기']
        }
      ]
    },
    {
      id: 'e5-u2',
      name: '분수의 곱셈',
      description: '분수끼리 곱하기',
      concepts: [
        {
          id: 'e5-2-1', name: '(분수) × (자연수)', description: '분수에 자연수 곱하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['분수에 자연수를 곱할 수 있다'],
          keyFormulas: ['2/5 × 3 = 6/5'],
          examples: ['피자 2/3조각씩 4명']
        },
        {
          id: 'e5-2-2', name: '(자연수) × (분수)', description: '자연수에 분수 곱하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['자연수에 분수를 곱할 수 있다'],
          keyFormulas: ['4 × 3/5 = 12/5'],
          examples: ['전체의 3/4']
        },
        {
          id: 'e5-2-3', name: '(진분수) × (진분수)', description: '분수끼리 곱하기',
          xp: 55, duration: '22분', difficulty: '고급',
          learningObjectives: ['진분수끼리 곱할 수 있다'],
          keyFormulas: ['a/b × c/d = ac/bd'],
          examples: ['2/3 × 3/4 = 6/12 = 1/2']
        },
        {
          id: 'e5-2-4', name: '(대분수) × (대분수)', description: '대분수끼리 곱하기',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['대분수를 가분수로 바꾸어 곱할 수 있다'],
          examples: ['1과 1/2 × 2와 1/3']
        },
        {
          id: 'e5-2-5', name: '분수의 곱셈 활용', description: '실생활 문제 해결',
          xp: 55, duration: '22분', difficulty: '고급',
          learningObjectives: ['분수의 곱셈을 활용하여 문제를 해결할 수 있다'],
          examples: ['전체 넓이의 2/3의 3/4']
        }
      ]
    },
    {
      id: 'e5-u3',
      name: '소수의 곱셈',
      description: '소수끼리 곱하기',
      concepts: [
        {
          id: 'e5-3-1', name: '(소수) × (자연수)', description: '소수에 자연수 곱하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['소수에 자연수를 곱할 수 있다'],
          examples: ['2.5 × 4 = 10']
        },
        {
          id: 'e5-3-2', name: '(자연수) × (소수)', description: '자연수에 소수 곱하기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['자연수에 소수를 곱할 수 있다'],
          examples: ['3 × 1.5 = 4.5']
        },
        {
          id: 'e5-3-3', name: '(소수) × (소수)', description: '소수끼리 곱하기',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['소수끼리 곱할 수 있다', '소수점 위치를 알 수 있다'],
          examples: ['2.5 × 1.2 = 3.00']
        },
        {
          id: 'e5-3-4', name: '곱의 소수점 위치', description: '소수점 자리수 규칙',
          xp: 55, duration: '22분', difficulty: '고급',
          learningObjectives: ['곱의 소수점 위치를 알 수 있다'],
          keyFormulas: ['소수 첫째 × 소수 둘째 = 소수 셋째'],
          examples: ['0.1 × 0.1 = 0.01']
        },
        {
          id: 'e5-3-5', name: '소수의 곱셈 활용', description: '실생활 문제 해결',
          xp: 55, duration: '22분', difficulty: '고급',
          learningObjectives: ['소수의 곱셈을 활용하여 문제를 해결할 수 있다'],
          examples: ['1m에 3500원인 천 2.5m 가격']
        }
      ]
    },
    {
      id: 'e5-u4',
      name: '합동과 대칭',
      description: '도형의 합동과 대칭',
      concepts: [
        {
          id: 'e5-4-1', name: '도형의 합동', description: '모양과 크기가 같은 도형',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['합동의 의미를 안다', '합동인 도형을 찾을 수 있다'],
          examples: ['완전히 포개어지는 두 도형']
        },
        {
          id: 'e5-4-2', name: '합동인 도형의 성질', description: '대응점, 대응변, 대응각',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['합동인 도형의 대응 요소를 찾을 수 있다'],
          examples: ['대응변의 길이가 같다', '대응각의 크기가 같다']
        },
        {
          id: 'e5-4-3', name: '선대칭도형', description: '접었을 때 완전히 포개어지는 도형',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['선대칭도형을 이해하고 그릴 수 있다'],
          examples: ['나비, 하트 모양']
        },
        {
          id: 'e5-4-4', name: '대칭축', description: '선대칭도형의 접는 선',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['대칭축을 찾고 그릴 수 있다'],
          examples: ['정사각형의 대칭축 4개']
        },
        {
          id: 'e5-4-5', name: '점대칭도형', description: '180° 돌렸을 때 겹치는 도형',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['점대칭도형을 이해하고 그릴 수 있다'],
          examples: ['S자 모양', '평행사변형']
        }
      ]
    },
    {
      id: 'e5-u5',
      name: '직육면체',
      description: '입체도형의 성질',
      concepts: [
        {
          id: 'e5-5-1', name: '직육면체 알아보기', description: '직육면체의 구성 요소',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['직육면체의 면, 모서리, 꼭짓점을 안다'],
          examples: ['면 6개, 모서리 12개, 꼭짓점 8개']
        },
        {
          id: 'e5-5-2', name: '정육면체', description: '모든 면이 정사각형인 직육면체',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['정육면체의 성질을 안다'],
          examples: ['주사위', '정육면체 상자']
        },
        {
          id: 'e5-5-3', name: '직육면체의 겉넓이', description: '여섯 면의 넓이의 합',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['직육면체의 겉넓이를 구할 수 있다'],
          keyFormulas: ['겉넓이 = 2(ab + bc + ca)'],
          examples: ['상자 포장지 넓이 구하기']
        },
        {
          id: 'e5-5-4', name: '직육면체의 부피', description: '안에 들어가는 양',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['직육면체의 부피를 구할 수 있다'],
          keyFormulas: ['부피 = 가로 × 세로 × 높이'],
          examples: ['물탱크에 들어가는 물의 양']
        },
        {
          id: 'e5-5-5', name: '부피 단위', description: 'cm³, m³, L, mL',
          xp: 55, duration: '22분', difficulty: '고급',
          learningObjectives: ['부피 단위 사이의 관계를 안다'],
          keyFormulas: ['1L = 1000cm³', '1m³ = 1000L'],
          examples: ['단위 변환하기']
        }
      ]
    }
  ]
};

// 초등학교 6학년
const elementary6: GradeData = {
  grade: 6,
  units: [
    {
      id: 'e6-u1',
      name: '분수의 나눗셈',
      description: '분수로 나누기',
      concepts: [
        {
          id: 'e6-1-1', name: '(자연수) ÷ (자연수)', description: '몫을 분수로 나타내기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['나눗셈의 몫을 분수로 나타낼 수 있다'],
          keyFormulas: ['3 ÷ 4 = 3/4'],
          examples: ['피자 3판을 4명이 나누면?']
        },
        {
          id: 'e6-1-2', name: '(분수) ÷ (자연수)', description: '분수를 자연수로 나누기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['분수를 자연수로 나눌 수 있다'],
          keyFormulas: ['a/b ÷ n = a/(b×n)'],
          examples: ['3/4 ÷ 2 = 3/8']
        },
        {
          id: 'e6-1-3', name: '(자연수) ÷ (분수)', description: '자연수를 분수로 나누기',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['자연수를 분수로 나눌 수 있다'],
          keyFormulas: ['a ÷ b/c = a × c/b'],
          examples: ['3 ÷ 1/4 = 12']
        },
        {
          id: 'e6-1-4', name: '(분수) ÷ (분수)', description: '분수끼리 나누기',
          xp: 65, duration: '28분', difficulty: '고급',
          learningObjectives: ['분수끼리 나눌 수 있다'],
          keyFormulas: ['a/b ÷ c/d = a/b × d/c'],
          examples: ['2/3 ÷ 1/2 = 4/3']
        },
        {
          id: 'e6-1-5', name: '분수의 나눗셈 활용', description: '실생활 문제 해결',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['분수의 나눗셈을 활용하여 문제를 해결할 수 있다'],
          examples: ['2/3L를 1/6L씩 나누면 몇 컵?']
        }
      ]
    },
    {
      id: 'e6-u2',
      name: '소수의 나눗셈',
      description: '소수로 나누기',
      concepts: [
        {
          id: 'e6-2-1', name: '(소수) ÷ (자연수)', description: '소수를 자연수로 나누기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['소수를 자연수로 나눌 수 있다'],
          examples: ['4.8 ÷ 4 = 1.2']
        },
        {
          id: 'e6-2-2', name: '(자연수) ÷ (소수)', description: '자연수를 소수로 나누기',
          xp: 55, duration: '22분', difficulty: '고급',
          learningObjectives: ['자연수를 소수로 나눌 수 있다'],
          examples: ['6 ÷ 0.5 = 12']
        },
        {
          id: 'e6-2-3', name: '(소수) ÷ (소수)', description: '소수끼리 나누기',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['소수끼리 나눌 수 있다'],
          examples: ['2.4 ÷ 0.3 = 8']
        },
        {
          id: 'e6-2-4', name: '몫의 소수점 위치', description: '나눗셈에서 소수점 처리',
          xp: 55, duration: '22분', difficulty: '고급',
          learningObjectives: ['나눗셈의 몫에서 소수점 위치를 알 수 있다'],
          examples: ['나누는 수가 정수가 되도록 변환']
        },
        {
          id: 'e6-2-5', name: '소수의 나눗셈 활용', description: '실생활 문제 해결',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['소수의 나눗셈을 활용하여 문제를 해결할 수 있다'],
          examples: ['2.5km를 0.5시간에 간 속력']
        }
      ]
    },
    {
      id: 'e6-u3',
      name: '비와 비율',
      description: '두 양의 관계',
      concepts: [
        {
          id: 'e6-3-1', name: '두 수의 비', description: '비의 개념 알기',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['비의 의미를 알고 나타낼 수 있다'],
          keyFormulas: ['a : b (a 대 b)'],
          examples: ['남학생 3명, 여학생 4명 → 3 : 4']
        },
        {
          id: 'e6-3-2', name: '비율', description: '기준량에 대한 비교하는 양의 크기',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['비율의 의미를 알고 구할 수 있다'],
          keyFormulas: ['비율 = 비교하는 양 ÷ 기준량'],
          examples: ['3 : 4의 비율 = 3/4 = 0.75']
        },
        {
          id: 'e6-3-3', name: '백분율', description: '기준량을 100으로 할 때의 비율',
          xp: 55, duration: '22분', difficulty: '중급',
          learningObjectives: ['백분율을 구하고 활용할 수 있다'],
          keyFormulas: ['백분율 = 비율 × 100%'],
          examples: ['0.75 = 75%']
        },
        {
          id: 'e6-3-4', name: '비의 성질', description: '비의 전항과 후항',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['비의 전항과 후항을 같은 수로 곱하거나 나눌 수 있다'],
          keyFormulas: ['a : b = ma : mb'],
          examples: ['2 : 3 = 4 : 6 = 6 : 9']
        },
        {
          id: 'e6-3-5', name: '비율의 활용', description: '할인율, 이자율 등',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['비율을 실생활에 활용할 수 있다'],
          examples: ['20% 할인된 가격 구하기']
        }
      ]
    },
    {
      id: 'e6-u4',
      name: '비례식과 비례배분',
      description: '비의 활용',
      concepts: [
        {
          id: 'e6-4-1', name: '비례식', description: '비가 같음을 나타내는 식',
          xp: 55, duration: '22분', difficulty: '고급',
          learningObjectives: ['비례식의 의미를 알고 나타낼 수 있다'],
          keyFormulas: ['a : b = c : d'],
          examples: ['2 : 3 = 4 : 6']
        },
        {
          id: 'e6-4-2', name: '비례식의 성질', description: '외항의 곱 = 내항의 곱',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['비례식의 성질을 이용하여 미지수를 구할 수 있다'],
          keyFormulas: ['a : b = c : d → ad = bc'],
          examples: ['2 : x = 4 : 6 → x = 3']
        },
        {
          id: 'e6-4-3', name: '비례배분', description: '전체를 비율대로 나누기',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['전체를 주어진 비로 배분할 수 있다'],
          examples: ['1000원을 2 : 3으로 나누면 400원, 600원']
        },
        {
          id: 'e6-4-4', name: '비례식의 활용', description: '실생활 문제 해결',
          xp: 65, duration: '28분', difficulty: '고급',
          learningObjectives: ['비례식을 활용하여 문제를 해결할 수 있다'],
          examples: ['축척을 이용한 실제 거리 구하기']
        }
      ]
    },
    {
      id: 'e6-u5',
      name: '원의 넓이',
      description: '원과 관련된 측정',
      concepts: [
        {
          id: 'e6-5-1', name: '원주율', description: '원주와 지름의 비',
          xp: 50, duration: '20분', difficulty: '중급',
          learningObjectives: ['원주율의 의미를 안다'],
          keyFormulas: ['π ≈ 3.14'],
          examples: ['원주 ÷ 지름 = π']
        },
        {
          id: 'e6-5-2', name: '원주 구하기', description: '원의 둘레 길이',
          xp: 55, duration: '22분', difficulty: '고급',
          learningObjectives: ['원주를 구할 수 있다'],
          keyFormulas: ['원주 = 지름 × π = 2πr'],
          examples: ['지름이 10cm인 원의 원주']
        },
        {
          id: 'e6-5-3', name: '원의 넓이', description: '원이 차지하는 평면의 크기',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['원의 넓이를 구할 수 있다'],
          keyFormulas: ['넓이 = πr²'],
          examples: ['반지름이 5cm인 원의 넓이']
        },
        {
          id: 'e6-5-4', name: '여러 가지 원의 넓이', description: '반원, 부채꼴 등',
          xp: 65, duration: '28분', difficulty: '고급',
          learningObjectives: ['반원, 부채꼴의 넓이를 구할 수 있다'],
          examples: ['반원의 넓이 = πr²/2']
        },
        {
          id: 'e6-5-5', name: '원의 넓이 활용', description: '실생활 문제 해결',
          xp: 60, duration: '25분', difficulty: '고급',
          learningObjectives: ['원의 넓이를 활용하여 문제를 해결할 수 있다'],
          examples: ['원형 화단의 넓이 구하기']
        }
      ]
    }
  ]
};

// 중학교 2학년
const middle2: GradeData = {
  grade: 2,
  units: [
    {
      id: 'm2-u1',
      name: '수와 식의 계산',
      description: '유리수와 순환소수, 단항식과 다항식',
      concepts: [
        {
          id: 'm2-1-1', name: '유리수와 순환소수', description: '유리수를 순환소수로 나타내기',
          xp: 70, duration: '50분', difficulty: '중급',
          learningObjectives: ['유리수와 순환소수의 관계를 안다'],
          examples: ['0.333...을 분수로 나타내면 1/3']
        },
        {
          id: 'm2-1-2', name: '지수법칙', description: '지수의 곱셈, 나눗셈, 거듭제곱',
          xp: 70, duration: '45분', difficulty: '중급',
          learningObjectives: ['지수법칙을 활용할 수 있다'],
          keyFormulas: ['a² × a³ = a⁵', '(a²)³ = a⁶'],
          examples: ['a⁵ ÷ a² = a³']
        },
        {
          id: 'm2-1-3', name: '단항식의 곱셈과 나눗셈', description: '단항식끼리의 연산',
          xp: 65, duration: '40분', difficulty: '중급',
          learningObjectives: ['단항식의 곱셈과 나눗셈을 할 수 있다'],
          examples: ['3x² × 2x³ = 6x⁵']
        },
        {
          id: 'm2-1-4', name: '다항식의 덧셈과 뺄셈', description: '동류항 계산',
          xp: 60, duration: '35분', difficulty: '중급',
          learningObjectives: ['동류항을 모아 계산할 수 있다'],
          examples: ['(2x+3) + (3x-1) = 5x+2']
        },
        {
          id: 'm2-1-5', name: '다항식의 곱셈', description: '분배법칙으로 전개하기',
          xp: 75, duration: '50분', difficulty: '고급',
          learningObjectives: ['다항식의 곱셈을 할 수 있다'],
          examples: ['(x+2)(x+3) = x²+5x+6']
        }
      ]
    },
    {
      id: 'm2-u2',
      name: '부등식과 연립방정식',
      description: '일차부등식과 연립일차방정식',
      concepts: [
        {
          id: 'm2-2-1', name: '부등식의 성질', description: '부등호의 방향과 연산',
          xp: 65, duration: '40분', difficulty: '중급',
          learningObjectives: ['부등식의 기본 성질을 안다'],
          keyFormulas: ['a > b이면 a+c > b+c'],
          examples: ['a > b이고 c < 0이면 ac < bc']
        },
        {
          id: 'm2-2-2', name: '일차부등식의 풀이', description: '일차부등식 해 구하기',
          xp: 70, duration: '45분', difficulty: '중급',
          learningObjectives: ['일차부등식을 풀 수 있다'],
          examples: ['2x-3 > 5 → x > 4']
        },
        {
          id: 'm2-2-3', name: '일차부등식의 활용', description: '실생활 문제 해결',
          xp: 75, duration: '50분', difficulty: '고급',
          learningObjectives: ['일차부등식으로 문제를 해결할 수 있다'],
          examples: ['예산 내에서 최대 구매 개수']
        },
        {
          id: 'm2-2-4', name: '연립일차방정식', description: '두 방정식의 공통해',
          xp: 70, duration: '40분', difficulty: '중급',
          learningObjectives: ['연립방정식의 의미를 안다'],
          examples: ['x+y=5, x-y=1의 해']
        },
        {
          id: 'm2-2-5', name: '대입법과 가감법', description: '연립방정식 풀이 방법',
          xp: 75, duration: '45분', difficulty: '고급',
          learningObjectives: ['대입법과 가감법으로 연립방정식을 풀 수 있다'],
          examples: ['y=2x를 x+y=6에 대입']
        },
        {
          id: 'm2-2-6', name: '연립방정식의 활용', description: '실생활 문제 해결',
          xp: 80, duration: '55분', difficulty: '고급',
          learningObjectives: ['연립방정식으로 문제를 해결할 수 있다'],
          examples: ['속력, 농도 문제']
        }
      ]
    },
    {
      id: 'm2-u3',
      name: '일차함수',
      description: '일차함수의 뜻과 그래프',
      concepts: [
        {
          id: 'm2-3-1', name: '함수의 뜻', description: '함수의 정의와 함숫값',
          xp: 65, duration: '40분', difficulty: '중급',
          learningObjectives: ['함수의 의미를 안다'],
          examples: ['f(x)=2x+1일 때 f(3)=7']
        },
        {
          id: 'm2-3-2', name: '일차함수와 그래프', description: 'y=ax+b의 그래프',
          xp: 75, duration: '50분', difficulty: '중급',
          learningObjectives: ['일차함수의 그래프를 그릴 수 있다'],
          examples: ['y=2x+1의 그래프']
        },
        {
          id: 'm2-3-3', name: '기울기', description: '기울기의 의미와 계산',
          xp: 70, duration: '45분', difficulty: '중급',
          learningObjectives: ['기울기를 구할 수 있다'],
          keyFormulas: ['기울기 = (y 증가량)/(x 증가량)'],
          examples: ['두 점을 지나는 직선의 기울기']
        },
        {
          id: 'm2-3-4', name: '일차함수의 식 구하기', description: '조건에서 식 결정',
          xp: 80, duration: '50분', difficulty: '고급',
          learningObjectives: ['조건에서 일차함수의 식을 구할 수 있다'],
          examples: ['점 (1,3)을 지나고 기울기 2']
        },
        {
          id: 'm2-3-5', name: '일차함수의 활용', description: '실생활 문제 해결',
          xp: 85, duration: '55분', difficulty: '고급',
          learningObjectives: ['일차함수로 실생활 문제를 해결할 수 있다'],
          examples: ['거리 = 속력 × 시간']
        }
      ]
    },
    {
      id: 'm2-u4',
      name: '도형의 성질',
      description: '삼각형과 사각형의 성질',
      concepts: [
        {
          id: 'm2-4-1', name: '이등변삼각형의 성질', description: '이등변삼각형의 특징',
          xp: 65, duration: '40분', difficulty: '중급',
          learningObjectives: ['이등변삼각형의 성질을 안다'],
          examples: ['두 밑각의 크기가 같다']
        },
        {
          id: 'm2-4-2', name: '삼각형의 외심과 내심', description: '외심과 내심의 성질',
          xp: 80, duration: '55분', difficulty: '고급',
          learningObjectives: ['외심과 내심을 구할 수 있다'],
          examples: ['외심은 세 꼭짓점에서 같은 거리']
        },
        {
          id: 'm2-4-3', name: '평행사변형의 성질', description: '평행사변형의 특징',
          xp: 70, duration: '45분', difficulty: '중급',
          learningObjectives: ['평행사변형의 성질을 안다'],
          examples: ['대변의 길이가 같다']
        },
        {
          id: 'm2-4-4', name: '여러 가지 사각형', description: '직사각형, 마름모, 정사각형',
          xp: 75, duration: '50분', difficulty: '고급',
          learningObjectives: ['여러 사각형의 성질을 안다'],
          examples: ['정사각형은 직사각형이면서 마름모']
        }
      ]
    },
    {
      id: 'm2-u5',
      name: '닮음과 피타고라스',
      description: '닮음과 피타고라스 정리',
      concepts: [
        {
          id: 'm2-5-1', name: '닮음의 뜻', description: '닮은 도형과 닮음비',
          xp: 70, duration: '45분', difficulty: '중급',
          learningObjectives: ['닮음의 의미를 안다'],
          examples: ['닮음비 2:3이면 넓이비 4:9']
        },
        {
          id: 'm2-5-2', name: '삼각형의 닮음 조건', description: 'AA, SAS, SSS 닮음',
          xp: 75, duration: '50분', difficulty: '고급',
          learningObjectives: ['삼각형의 닮음 조건을 안다'],
          examples: ['두 쌍의 대응각이 같으면 AA닮음']
        },
        {
          id: 'm2-5-3', name: '피타고라스 정리', description: '직각삼각형의 변 관계',
          xp: 80, duration: '50분', difficulty: '고급',
          learningObjectives: ['피타고라스 정리를 활용할 수 있다'],
          keyFormulas: ['a² + b² = c²'],
          examples: ['빗변의 길이 구하기']
        },
        {
          id: 'm2-5-4', name: '피타고라스 정리의 활용', description: '거리, 높이 계산',
          xp: 85, duration: '55분', difficulty: '고급',
          learningObjectives: ['피타고라스 정리로 문제를 해결할 수 있다'],
          examples: ['직사각형의 대각선 길이']
        }
      ]
    },
    {
      id: 'm2-u6',
      name: '확률',
      description: '경우의 수와 확률',
      concepts: [
        {
          id: 'm2-6-1', name: '경우의 수', description: '사건의 경우의 수',
          xp: 65, duration: '40분', difficulty: '중급',
          learningObjectives: ['경우의 수를 구할 수 있다'],
          keyFormulas: ['합의 법칙, 곱의 법칙'],
          examples: ['동전 2개의 경우의 수: 4']
        },
        {
          id: 'm2-6-2', name: '확률의 뜻', description: '확률의 정의',
          xp: 70, duration: '45분', difficulty: '중급',
          learningObjectives: ['확률을 구할 수 있다'],
          examples: ['주사위에서 3의 배수 확률: 1/3']
        },
        {
          id: 'm2-6-3', name: '확률의 계산', description: '덧셈, 곱셈 확률',
          xp: 80, duration: '50분', difficulty: '고급',
          learningObjectives: ['복합 확률을 계산할 수 있다'],
          examples: ['A 또는 B가 일어날 확률']
        }
      ]
    }
  ]
};

// 중학교 3학년
const middle3: GradeData = {
  grade: 3,
  units: [
    {
      id: 'm3-u1',
      name: '제곱근과 실수',
      description: '제곱근과 무리수',
      concepts: [
        {
          id: 'm3-1-1', name: '제곱근의 뜻', description: '제곱근의 정의와 성질',
          xp: 70, duration: '45분', difficulty: '중급',
          learningObjectives: ['제곱근의 의미를 안다'],
          examples: ['√9 = 3, 9의 제곱근: ±3']
        },
        {
          id: 'm3-1-2', name: '무리수와 실수', description: '실수 체계',
          xp: 70, duration: '40분', difficulty: '중급',
          learningObjectives: ['무리수와 실수를 안다'],
          examples: ['√2, π는 무리수']
        },
        {
          id: 'm3-1-3', name: '근호의 계산', description: '근호가 있는 식의 연산',
          xp: 75, duration: '45분', difficulty: '고급',
          learningObjectives: ['근호가 있는 식을 계산할 수 있다'],
          examples: ['√2 × √3 = √6']
        },
        {
          id: 'm3-1-4', name: '분모의 유리화', description: '분모에서 근호 없애기',
          xp: 80, duration: '50분', difficulty: '고급',
          learningObjectives: ['분모를 유리화할 수 있다'],
          examples: ['1/√2 = √2/2']
        }
      ]
    },
    {
      id: 'm3-u2',
      name: '인수분해',
      description: '곱셈공식과 인수분해',
      concepts: [
        {
          id: 'm3-2-1', name: '곱셈공식', description: '완전제곱식, 합차공식',
          xp: 75, duration: '50분', difficulty: '중급',
          learningObjectives: ['곱셈공식을 활용할 수 있다'],
          keyFormulas: ['(a+b)² = a²+2ab+b²'],
          examples: ['(a+b)(a-b) = a²-b²']
        },
        {
          id: 'm3-2-2', name: '인수분해', description: '다항식을 인수로 분해',
          xp: 80, duration: '55분', difficulty: '고급',
          learningObjectives: ['다항식을 인수분해할 수 있다'],
          examples: ['x²+5x+6 = (x+2)(x+3)']
        },
        {
          id: 'm3-2-3', name: '복잡한 인수분해', description: '치환을 이용한 인수분해',
          xp: 90, duration: '60분', difficulty: '심화',
          learningObjectives: ['복잡한 식을 인수분해할 수 있다'],
          examples: ['(x+1)²-4 = (x+3)(x-1)']
        }
      ]
    },
    {
      id: 'm3-u3',
      name: '이차방정식',
      description: '이차방정식의 풀이',
      concepts: [
        {
          id: 'm3-3-1', name: '이차방정식', description: 'ax²+bx+c=0 형태',
          xp: 70, duration: '40분', difficulty: '중급',
          learningObjectives: ['이차방정식의 의미를 안다'],
          examples: ['x²-5x+6=0의 해']
        },
        {
          id: 'm3-3-2', name: '인수분해 풀이', description: '인수분해로 풀기',
          xp: 75, duration: '45분', difficulty: '고급',
          learningObjectives: ['인수분해로 이차방정식을 풀 수 있다'],
          examples: ['(x-2)(x-3)=0']
        },
        {
          id: 'm3-3-3', name: '근의 공식', description: '공식으로 해 구하기',
          xp: 85, duration: '55분', difficulty: '고급',
          learningObjectives: ['근의 공식을 사용할 수 있다'],
          keyFormulas: ['x = (-b±√(b²-4ac))/2a'],
          examples: ['판별식 D=b²-4ac']
        },
        {
          id: 'm3-3-4', name: '이차방정식의 활용', description: '실생활 문제 해결',
          xp: 90, duration: '60분', difficulty: '심화',
          learningObjectives: ['이차방정식으로 문제를 해결할 수 있다'],
          examples: ['연속하는 두 자연수의 곱이 72']
        }
      ]
    },
    {
      id: 'm3-u4',
      name: '이차함수',
      description: '이차함수의 그래프',
      concepts: [
        {
          id: 'm3-4-1', name: 'y=ax²의 그래프', description: '기본 포물선',
          xp: 70, duration: '45분', difficulty: '중급',
          learningObjectives: ['y=ax²의 그래프를 그릴 수 있다'],
          examples: ['원점이 꼭짓점인 포물선']
        },
        {
          id: 'm3-4-2', name: 'y=a(x-p)²+q의 그래프', description: '평행이동',
          xp: 80, duration: '50분', difficulty: '고급',
          learningObjectives: ['평행이동을 이해한다'],
          examples: ['꼭짓점이 (p,q)']
        },
        {
          id: 'm3-4-3', name: 'y=ax²+bx+c의 그래프', description: '일반형',
          xp: 85, duration: '55분', difficulty: '고급',
          learningObjectives: ['일반형을 표준형으로 바꿀 수 있다'],
          examples: ['완전제곱식으로 변환']
        },
        {
          id: 'm3-4-4', name: '이차함수의 최댓값과 최솟값', description: '극값 구하기',
          xp: 85, duration: '50분', difficulty: '고급',
          learningObjectives: ['최댓값, 최솟값을 구할 수 있다'],
          examples: ['a>0이면 꼭짓점에서 최솟값']
        }
      ]
    },
    {
      id: 'm3-u5',
      name: '삼각비',
      description: '삼각비의 뜻과 활용',
      concepts: [
        {
          id: 'm3-5-1', name: '삼각비의 뜻', description: 'sin, cos, tan',
          xp: 70, duration: '45분', difficulty: '중급',
          learningObjectives: ['삼각비의 정의를 안다'],
          examples: ['sin A = 대변/빗변']
        },
        {
          id: 'm3-5-2', name: '특수한 각의 삼각비', description: '30°, 45°, 60°',
          xp: 70, duration: '40분', difficulty: '중급',
          learningObjectives: ['특수각의 삼각비를 안다'],
          examples: ['sin 30° = 1/2']
        },
        {
          id: 'm3-5-3', name: '삼각비의 활용', description: '높이, 거리 계산',
          xp: 85, duration: '55분', difficulty: '고급',
          learningObjectives: ['삼각비로 거리를 구할 수 있다'],
          examples: ['탑의 높이 = 거리 × tan(앙각)']
        }
      ]
    },
    {
      id: 'm3-u6',
      name: '원의 성질',
      description: '원과 직선, 원주각',
      concepts: [
        {
          id: 'm3-6-1', name: '원과 현', description: '현의 성질',
          xp: 65, duration: '40분', difficulty: '중급',
          learningObjectives: ['현의 성질을 안다'],
          examples: ['현의 수직이등분선은 중심을 지난다']
        },
        {
          id: 'm3-6-2', name: '원주각', description: '원주각과 중심각',
          xp: 75, duration: '45분', difficulty: '고급',
          learningObjectives: ['원주각과 중심각의 관계를 안다'],
          examples: ['원주각 = 중심각/2']
        },
        {
          id: 'm3-6-3', name: '원주각의 활용', description: '원에 내접하는 사각형',
          xp: 85, duration: '55분', difficulty: '고급',
          learningObjectives: ['원주각을 활용할 수 있다'],
          examples: ['내접사각형의 대각의 합 = 180°']
        }
      ]
    },
    {
      id: 'm3-u7',
      name: '통계',
      description: '대푯값과 산포도',
      concepts: [
        {
          id: 'm3-7-1', name: '대푯값', description: '평균, 중앙값, 최빈값',
          xp: 65, duration: '40분', difficulty: '중급',
          learningObjectives: ['대푯값을 구할 수 있다'],
          examples: ['1,2,3,4,5의 평균=3']
        },
        {
          id: 'm3-7-2', name: '산포도', description: '분산과 표준편차',
          xp: 80, duration: '50분', difficulty: '고급',
          learningObjectives: ['분산과 표준편차를 구할 수 있다'],
          keyFormulas: ['분산 = (편차²의 합)/n'],
          examples: ['자료의 흩어진 정도']
        }
      ]
    }
  ]
};

// 고등학교 2학년
const high2: GradeData = {
  grade: 2,
  units: [
    {
      id: 'h2-u1',
      name: '지수와 로그',
      description: '지수의 확장과 로그',
      concepts: [
        {
          id: 'h2-1-1', name: '거듭제곱근', description: 'n제곱근의 뜻과 성질',
          xp: 70, duration: '45분', difficulty: '고급',
          learningObjectives: ['거듭제곱근을 이해한다'],
          examples: ['³√8 = 2']
        },
        {
          id: 'h2-1-2', name: '지수의 확장', description: '유리수, 실수 지수',
          xp: 80, duration: '50분', difficulty: '고급',
          learningObjectives: ['실수 지수를 이해한다'],
          keyFormulas: ['a^(1/n) = ⁿ√a'],
          examples: ['2^(3/2) = 2√2']
        },
        {
          id: 'h2-1-3', name: '로그의 뜻', description: '로그의 정의',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['로그의 의미를 안다'],
          examples: ['log₂8 = 3']
        },
        {
          id: 'h2-1-4', name: '로그의 연산', description: '로그의 성질',
          xp: 85, duration: '50분', difficulty: '심화',
          learningObjectives: ['로그의 성질을 활용할 수 있다'],
          keyFormulas: ['log ab = log a + log b'],
          examples: ['밑 변환 공식']
        }
      ]
    },
    {
      id: 'h2-u2',
      name: '지수함수와 로그함수',
      description: '지수함수와 로그함수의 그래프',
      concepts: [
        {
          id: 'h2-2-1', name: '지수함수', description: 'y=aˣ의 그래프',
          xp: 75, duration: '45분', difficulty: '고급',
          learningObjectives: ['지수함수의 그래프를 그릴 수 있다'],
          examples: ['y=2^x, y=(1/2)^x']
        },
        {
          id: 'h2-2-2', name: '로그함수', description: 'y=log_a x의 그래프',
          xp: 80, duration: '45분', difficulty: '고급',
          learningObjectives: ['로그함수의 그래프를 그릴 수 있다'],
          examples: ['지수함수와 역함수 관계']
        },
        {
          id: 'h2-2-3', name: '지수방정식과 부등식', description: '지수 포함 방정식',
          xp: 90, duration: '55분', difficulty: '심화',
          learningObjectives: ['지수방정식을 풀 수 있다'],
          examples: ['2^x = 8 → x=3']
        },
        {
          id: 'h2-2-4', name: '로그방정식과 부등식', description: '로그 포함 방정식',
          xp: 95, duration: '60분', difficulty: '심화',
          learningObjectives: ['로그방정식을 풀 수 있다'],
          examples: ['log₂x = 3 → x=8']
        }
      ]
    },
    {
      id: 'h2-u3',
      name: '삼각함수',
      description: '삼각함수의 정의와 그래프',
      concepts: [
        {
          id: 'h2-3-1', name: '일반각과 호도법', description: '라디안',
          xp: 70, duration: '40분', difficulty: '고급',
          learningObjectives: ['호도법을 이해한다'],
          keyFormulas: ['180° = π rad'],
          examples: ['1 rad ≈ 57.3°']
        },
        {
          id: 'h2-3-2', name: '삼각함수의 정의', description: '단위원',
          xp: 80, duration: '50분', difficulty: '심화',
          learningObjectives: ['삼각함수를 정의할 수 있다'],
          examples: ['sin θ = y좌표']
        },
        {
          id: 'h2-3-3', name: '삼각함수의 그래프', description: 'sin, cos, tan 그래프',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['삼각함수의 그래프를 그릴 수 있다'],
          examples: ['주기, 진폭']
        },
        {
          id: 'h2-3-4', name: '삼각방정식', description: '삼각함수 방정식',
          xp: 95, duration: '60분', difficulty: '최상',
          learningObjectives: ['삼각방정식을 풀 수 있다'],
          examples: ['sin x = 1/2의 일반해']
        }
      ]
    },
    {
      id: 'h2-u4',
      name: '사인법칙과 코사인법칙',
      description: '삼각형에서의 활용',
      concepts: [
        {
          id: 'h2-4-1', name: '사인법칙', description: 'a/sin A = 2R',
          xp: 80, duration: '50분', difficulty: '심화',
          learningObjectives: ['사인법칙을 활용할 수 있다'],
          keyFormulas: ['a/sin A = b/sin B = 2R'],
          examples: ['외접원의 반지름']
        },
        {
          id: 'h2-4-2', name: '코사인법칙', description: 'a² = b² + c² - 2bc cos A',
          xp: 80, duration: '50분', difficulty: '심화',
          learningObjectives: ['코사인법칙을 활용할 수 있다'],
          examples: ['세 변으로 각 구하기']
        },
        {
          id: 'h2-4-3', name: '삼각형의 넓이', description: 'S = (1/2)bc sin A',
          xp: 75, duration: '45분', difficulty: '심화',
          learningObjectives: ['삼각형의 넓이를 구할 수 있다'],
          examples: ['두 변과 끼인각으로 넓이']
        }
      ]
    },
    {
      id: 'h2-u5',
      name: '함수의 극한',
      description: '함수의 극한과 연속',
      concepts: [
        {
          id: 'h2-5-1', name: '함수의 극한', description: '극한의 뜻',
          xp: 85, duration: '50분', difficulty: '심화',
          learningObjectives: ['함수의 극한을 이해한다'],
          examples: ['lim(x→1) (x²-1)/(x-1) = 2']
        },
        {
          id: 'h2-5-2', name: '극한 계산', description: '부정형의 극한',
          xp: 95, duration: '60분', difficulty: '최상',
          learningObjectives: ['극한을 계산할 수 있다'],
          examples: ['0/0 꼴의 극한']
        },
        {
          id: 'h2-5-3', name: '함수의 연속', description: '연속의 정의',
          xp: 85, duration: '50분', difficulty: '심화',
          learningObjectives: ['연속의 의미를 안다'],
          examples: ['lim f(x) = f(a)']
        }
      ]
    },
    {
      id: 'h2-u6',
      name: '미분',
      description: '미분계수와 도함수',
      concepts: [
        {
          id: 'h2-6-1', name: '미분계수', description: '순간변화율',
          xp: 85, duration: '50분', difficulty: '심화',
          learningObjectives: ['미분계수의 의미를 안다'],
          keyFormulas: ["f'(a) = lim [f(a+h)-f(a)]/h"],
          examples: ['접선의 기울기']
        },
        {
          id: 'h2-6-2', name: '도함수', description: '미분법',
          xp: 90, duration: '55분', difficulty: '심화',
          learningObjectives: ['도함수를 구할 수 있다'],
          keyFormulas: ["(x^n)' = nx^(n-1)"],
          examples: ['다항함수의 미분']
        },
        {
          id: 'h2-6-3', name: '접선의 방정식', description: '곡선의 접선',
          xp: 85, duration: '45분', difficulty: '심화',
          learningObjectives: ['접선의 방정식을 구할 수 있다'],
          examples: ['y=x²에서 (1,1)의 접선']
        },
        {
          id: 'h2-6-4', name: '함수의 증감과 극값', description: '극대, 극소',
          xp: 95, duration: '55분', difficulty: '최상',
          learningObjectives: ['함수의 극값을 구할 수 있다'],
          examples: ["f'(x)=0인 점에서 극값"]
        },
        {
          id: 'h2-6-5', name: '미분의 활용', description: '최대, 최소 문제',
          xp: 100, duration: '60분', difficulty: '최상',
          learningObjectives: ['미분으로 최적화 문제를 풀 수 있다'],
          examples: ['넓이가 최대인 직사각형']
        }
      ]
    },
    {
      id: 'h2-u7',
      name: '적분',
      description: '부정적분과 정적분',
      concepts: [
        {
          id: 'h2-7-1', name: '부정적분', description: '원시함수',
          xp: 85, duration: '50분', difficulty: '심화',
          learningObjectives: ['부정적분을 구할 수 있다'],
          keyFormulas: ['∫x^n dx = x^(n+1)/(n+1) + C'],
          examples: ['미분의 역과정']
        },
        {
          id: 'h2-7-2', name: '정적분', description: '정적분의 계산',
          xp: 90, duration: '55분', difficulty: '심화',
          learningObjectives: ['정적분을 계산할 수 있다'],
          examples: ['∫₀² x² dx = 8/3']
        },
        {
          id: 'h2-7-3', name: '정적분과 넓이', description: '곡선 아래 넓이',
          xp: 90, duration: '50분', difficulty: '심화',
          learningObjectives: ['넓이를 적분으로 구할 수 있다'],
          examples: ['y=x²과 x축 사이의 넓이']
        },
        {
          id: 'h2-7-4', name: '두 곡선 사이의 넓이', description: '도형의 넓이',
          xp: 95, duration: '55분', difficulty: '최상',
          learningObjectives: ['두 곡선 사이 넓이를 구할 수 있다'],
          examples: ['y=x²과 y=x 사이']
        }
      ]
    }
  ]
};

// 고등학교 3학년
const high3: GradeData = {
  grade: 3,
  units: [
    {
      id: 'h3-u1',
      name: '순열과 조합',
      description: '경우의 수',
      concepts: [
        {
          id: 'h3-1-1', name: '순열', description: 'nPr',
          xp: 70, duration: '45분', difficulty: '고급',
          learningObjectives: ['순열을 계산할 수 있다'],
          keyFormulas: ['nPr = n!/(n-r)!'],
          examples: ['5P3 = 60']
        },
        {
          id: 'h3-1-2', name: '조합', description: 'nCr',
          xp: 70, duration: '45분', difficulty: '고급',
          learningObjectives: ['조합을 계산할 수 있다'],
          keyFormulas: ['nCr = n!/r!(n-r)!'],
          examples: ['5C3 = 10']
        },
        {
          id: 'h3-1-3', name: '이항정리', description: '(a+b)^n의 전개',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['이항정리를 활용할 수 있다'],
          examples: ['(a+b)³의 전개']
        }
      ]
    },
    {
      id: 'h3-u2',
      name: '확률',
      description: '확률의 정의와 계산',
      concepts: [
        {
          id: 'h3-2-1', name: '확률의 뜻', description: '수학적 확률',
          xp: 70, duration: '45분', difficulty: '고급',
          learningObjectives: ['확률을 정의할 수 있다'],
          examples: ['P(A) = n(A)/n(S)']
        },
        {
          id: 'h3-2-2', name: '조건부확률', description: 'P(B|A)',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['조건부확률을 계산할 수 있다'],
          keyFormulas: ['P(B|A) = P(A∩B)/P(A)'],
          examples: ['사전확률과 사후확률']
        },
        {
          id: 'h3-2-3', name: '독립시행', description: '베르누이 시행',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['독립시행의 확률을 구할 수 있다'],
          examples: ['동전을 n번 던질 때']
        }
      ]
    },
    {
      id: 'h3-u3',
      name: '통계',
      description: '확률분포와 추정',
      concepts: [
        {
          id: 'h3-3-1', name: '확률변수', description: '기댓값과 분산',
          xp: 80, duration: '50분', difficulty: '심화',
          learningObjectives: ['확률변수를 이해한다'],
          keyFormulas: ['E(X) = Σ x·P(X=x)'],
          examples: ['이산확률변수']
        },
        {
          id: 'h3-3-2', name: '이항분포', description: 'B(n,p)',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['이항분포를 활용할 수 있다'],
          keyFormulas: ['E(X)=np, V(X)=npq'],
          examples: ['n번 시행에서 성공 횟수']
        },
        {
          id: 'h3-3-3', name: '정규분포', description: 'N(μ,σ²)',
          xp: 90, duration: '60분', difficulty: '심화',
          learningObjectives: ['정규분포를 이해한다'],
          keyFormulas: ['Z = (X-μ)/σ'],
          examples: ['표준정규분포']
        },
        {
          id: 'h3-3-4', name: '모평균의 추정', description: '신뢰구간',
          xp: 95, duration: '60분', difficulty: '최상',
          learningObjectives: ['모평균을 추정할 수 있다'],
          examples: ['95% 신뢰구간']
        }
      ]
    },
    {
      id: 'h3-u4',
      name: '수열의 극한',
      description: '수열과 급수',
      concepts: [
        {
          id: 'h3-4-1', name: '수열의 극한', description: '수렴과 발산',
          xp: 80, duration: '50분', difficulty: '심화',
          learningObjectives: ['수열의 극한을 구할 수 있다'],
          examples: ['lim 1/n = 0']
        },
        {
          id: 'h3-4-2', name: '급수', description: '무한급수',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['급수의 합을 구할 수 있다'],
          examples: ['Σ(1/2^n) = 1']
        },
        {
          id: 'h3-4-3', name: '등비급수', description: '등비급수의 합',
          xp: 85, duration: '50분', difficulty: '심화',
          learningObjectives: ['등비급수의 합을 구할 수 있다'],
          keyFormulas: ['|r|<1일 때 Σar^n = a/(1-r)'],
          examples: ['수렴 조건']
        }
      ]
    },
    {
      id: 'h3-u5',
      name: '여러 가지 함수의 미분',
      description: '지수, 로그, 삼각함수의 미분',
      concepts: [
        {
          id: 'h3-5-1', name: '지수함수의 미분', description: "(e^x)' = e^x",
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['지수함수를 미분할 수 있다'],
          keyFormulas: ["(e^x)' = e^x", "(a^x)' = a^x ln a"],
          examples: ['자연로그의 밑 e']
        },
        {
          id: 'h3-5-2', name: '로그함수의 미분', description: "(ln x)' = 1/x",
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['로그함수를 미분할 수 있다'],
          keyFormulas: ["(ln x)' = 1/x"],
          examples: ['로그미분법']
        },
        {
          id: 'h3-5-3', name: '삼각함수의 미분', description: "(sin x)' = cos x",
          xp: 90, duration: '55분', difficulty: '심화',
          learningObjectives: ['삼각함수를 미분할 수 있다'],
          keyFormulas: ["(sin x)' = cos x", "(cos x)' = -sin x"],
          examples: ['삼각함수 미분']
        },
        {
          id: 'h3-5-4', name: '합성함수의 미분', description: '연쇄법칙',
          xp: 95, duration: '60분', difficulty: '최상',
          learningObjectives: ['합성함수를 미분할 수 있다'],
          keyFormulas: ["[f(g(x))]' = f'(g(x))·g'(x)"],
          examples: ['Chain Rule']
        }
      ]
    },
    {
      id: 'h3-u6',
      name: '여러 가지 함수의 적분',
      description: '다양한 적분법',
      concepts: [
        {
          id: 'h3-6-1', name: '지수함수의 적분', description: '∫e^x dx = e^x + C',
          xp: 85, duration: '50분', difficulty: '심화',
          learningObjectives: ['지수함수를 적분할 수 있다'],
          examples: ['∫e^x dx']
        },
        {
          id: 'h3-6-2', name: '삼각함수의 적분', description: '∫sin x dx = -cos x + C',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['삼각함수를 적분할 수 있다'],
          examples: ['∫cos x dx = sin x + C']
        },
        {
          id: 'h3-6-3', name: '치환적분', description: '합성함수의 적분',
          xp: 95, duration: '60분', difficulty: '최상',
          learningObjectives: ['치환적분을 할 수 있다'],
          examples: ['∫f(g(x))g\'(x)dx']
        },
        {
          id: 'h3-6-4', name: '부분적분', description: '∫u dv = uv - ∫v du',
          xp: 100, duration: '60분', difficulty: '최상',
          learningObjectives: ['부분적분을 할 수 있다'],
          examples: ['∫x e^x dx']
        },
        {
          id: 'h3-6-5', name: '정적분의 활용', description: '넓이와 부피',
          xp: 95, duration: '55분', difficulty: '최상',
          learningObjectives: ['적분으로 넓이와 부피를 구할 수 있다'],
          examples: ['회전체의 부피']
        }
      ]
    },
    {
      id: 'h3-u7',
      name: '이차곡선',
      description: '포물선, 타원, 쌍곡선',
      concepts: [
        {
          id: 'h3-7-1', name: '포물선', description: 'y² = 4px',
          xp: 80, duration: '50분', difficulty: '심화',
          learningObjectives: ['포물선의 방정식을 안다'],
          examples: ['초점과 준선']
        },
        {
          id: 'h3-7-2', name: '타원', description: 'x²/a² + y²/b² = 1',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['타원의 방정식을 안다'],
          examples: ['두 초점의 거리']
        },
        {
          id: 'h3-7-3', name: '쌍곡선', description: 'x²/a² - y²/b² = 1',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['쌍곡선의 방정식을 안다'],
          examples: ['점근선']
        }
      ]
    },
    {
      id: 'h3-u8',
      name: '평면벡터',
      description: '벡터의 연산과 내적',
      concepts: [
        {
          id: 'h3-8-1', name: '벡터의 연산', description: '덧셈, 실수배',
          xp: 70, duration: '45분', difficulty: '고급',
          learningObjectives: ['벡터의 연산을 할 수 있다'],
          examples: ['a⃗ + b⃗, 2a⃗']
        },
        {
          id: 'h3-8-2', name: '벡터의 내적', description: 'a⃗·b⃗',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['내적을 계산할 수 있다'],
          keyFormulas: ['a⃗·b⃗ = |a⃗||b⃗|cos θ'],
          examples: ['a⃗·b⃗ = a₁b₁ + a₂b₂']
        },
        {
          id: 'h3-8-3', name: '직선의 방정식', description: '벡터로 직선 표현',
          xp: 80, duration: '50분', difficulty: '심화',
          learningObjectives: ['직선의 벡터방정식을 구할 수 있다'],
          examples: ['r⃗ = a⃗ + tb⃗']
        }
      ]
    },
    {
      id: 'h3-u9',
      name: '공간도형과 공간좌표',
      description: '3차원 기하',
      concepts: [
        {
          id: 'h3-9-1', name: '공간좌표', description: '3차원 좌표',
          xp: 70, duration: '45분', difficulty: '고급',
          learningObjectives: ['공간좌표를 이해한다'],
          examples: ['두 점 사이의 거리']
        },
        {
          id: 'h3-9-2', name: '공간벡터', description: '3차원 벡터',
          xp: 85, duration: '55분', difficulty: '심화',
          learningObjectives: ['공간벡터의 연산을 할 수 있다'],
          examples: ['a⃗ = (a₁, a₂, a₃)']
        },
        {
          id: 'h3-9-3', name: '평면의 방정식', description: 'ax + by + cz + d = 0',
          xp: 90, duration: '55분', difficulty: '심화',
          learningObjectives: ['평면의 방정식을 구할 수 있다'],
          examples: ['법선벡터']
        },
        {
          id: 'h3-9-4', name: '점과 평면 사이의 거리', description: '거리 공식',
          xp: 90, duration: '50분', difficulty: '심화',
          learningObjectives: ['점에서 평면까지 거리를 구할 수 있다'],
          keyFormulas: ['d = |ax₀+by₀+cz₀+d|/√(a²+b²+c²)'],
          examples: ['최단거리']
        }
      ]
    }
  ]
};

export const CURRICULUM_DATA: Record<string, SchoolLevel> = {
  elementary: {
    label: '초등학교',
    icon: '📚',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    grades: [elementary1, elementary2, elementary3, elementary4, elementary5, elementary6]
  },
  middle: {
    label: '중학교',
    icon: '📖',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    grades: [middle1, middle2, middle3]
  },
  high: {
    label: '고등학교',
    icon: '🎓',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    grades: [high1, high2, high3]
  }
};

// 사용자 학년에 맞는 추천 콘텐츠 가져오기
export function getRecommendedContent(schoolType: string, gradeLevel: number, limit: number = 4) {
  const school = CURRICULUM_DATA[schoolType];
  if (!school) return [];

  const gradeData = school.grades.find(g => g.grade === gradeLevel);
  if (!gradeData || gradeData.units.length === 0) return [];

  const concepts: Array<Concept & { schoolType: string; grade: number; unitName: string }> = [];

  for (const unit of gradeData.units) {
    for (const concept of unit.concepts) {
      concepts.push({
        ...concept,
        schoolType,
        grade: gradeLevel,
        unitName: unit.name
      });
    }
  }

  // 랜덤하게 섞고 limit 개수만큼 반환
  return concepts.sort(() => Math.random() - 0.5).slice(0, limit);
}

// 특정 개념 ID로 개념 정보 가져오기
export function getConceptById(conceptId: string) {
  for (const [schoolType, school] of Object.entries(CURRICULUM_DATA)) {
    for (const gradeData of school.grades) {
      for (const unit of gradeData.units) {
        const concept = unit.concepts.find(c => c.id === conceptId);
        if (concept) {
          return {
            ...concept,
            schoolType,
            grade: gradeData.grade,
            unitName: unit.name,
            schoolLabel: school.label
          };
        }
      }
    }
  }
  return null;
}

// 학년별 전체 개념 수 계산
export function getTotalConceptCount(schoolType: string, gradeLevel: number): number {
  const school = CURRICULUM_DATA[schoolType];
  if (!school) return 0;

  const gradeData = school.grades.find(g => g.grade === gradeLevel);
  if (!gradeData) return 0;

  return gradeData.units.reduce((acc, unit) => acc + unit.concepts.length, 0);
}
