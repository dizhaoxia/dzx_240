## 1. 架构设计

```mermaid
graph TB
    "前端层 React18" --> "状态管理 useReducer"
    "状态管理 useReducer" --> "游戏状态机"
    "游戏状态机" --> "idle / playing / gameOver"
    "前端层 React18" --> "模拟题库 API"
    "模拟题库 API" --> "JSON数据"
    "前端层 React18" --> "倒计时引擎"
    "倒计时引擎" --> "setInterval + useEffect"
```

纯前端架构，无需后端服务，题库以JSON形式内嵌前端。

## 2. 技术说明

- 前端：React@18 + TypeScript + TailwindCSS@3 + Vite
- 初始化工具：vite-init
- 状态管理：useReducer + 状态机模式（用户指定）
- 后端：无（纯前端项目）
- 数据库：无（使用前端模拟JSON题库）
- 倒计时：setInterval + useEffect清理
- 图标：lucide-react

## 3. 路由定义

本项目为单页应用，不使用路由，通过游戏状态机切换界面：

| 状态 | 显示界面 |
|-----|---------|
| idle | 游戏主界面（开始页） |
| playing | 答题界面 |
| levelComplete | 关卡过渡界面 |
| gameOver | 游戏结束界面 |

## 4. 状态机设计

### 4.1 状态定义

```typescript
type GameState = 'idle' | 'playing' | 'levelComplete' | 'gameOver'
```

### 4.2 Action定义

```typescript
type GameAction =
  | { type: 'START_GAME' }
  | { type: 'ANSWER_QUESTION'; payload: string }
  | { type: 'TIME_UP' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'RESTART_GAME' }
```

### 4.3 状态流转

```mermaid
stateDiagram-v2
    "idle" --> "playing": START_GAME
    "playing" --> "playing": ANSWER_QUESTION (非关底题)
    "playing" --> "levelComplete": ANSWER_QUESTION (关底题)
    "playing" --> "playing": TIME_UP (非关底题)
    "playing" --> "levelComplete": TIME_UP (关底题)
    "playing" --> "gameOver": ANSWER_QUESTION (最后一关最后一题)
    "playing" --> "gameOver": TIME_UP (最后一关最后一题)
    "levelComplete" --> "playing": NEXT_LEVEL
    "gameOver" --> "idle": RESTART_GAME
```

### 4.4 游戏数据模型

```typescript
interface GameData {
  state: GameState
  questions: Question[]
  currentIndex: number
  score: number
  correctCount: number
  currentLevel: number
  timeLeft: number
  answered: boolean
  selectedAnswer: string | null
  isCorrect: boolean | null
}
```

## 5. 题库数据模型

```typescript
interface Question {
  id: number
  question: string
  options: string[]
  answer: string
}
```

题库包含至少25道脑筋急转弯题目（5关 × 5题），以JSON数组形式存储在前端。
