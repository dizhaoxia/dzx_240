import type { Question } from "@/types/game"

const easyQuestions: Question[] = [
  {
    id: 1,
    question: "什么东西越洗越脏？",
    options: ["衣服", "碗筷", "水", "手"],
    answer: "水",
    difficulty: 1,
  },
  {
    id: 2,
    question: "什么门永远关不上？",
    options: ["房门", "球门", "柜门", "车门"],
    answer: "球门",
    difficulty: 1,
  },
  {
    id: 3,
    question: "什么东西有牙齿却不会咬人？",
    options: ["老虎", "梳子", "鳄鱼", "鲨鱼"],
    answer: "梳子",
    difficulty: 1,
  },
  {
    id: 4,
    question: "什么路最窄？",
    options: ["小路", "冤家路", "山路", "弯路"],
    answer: "冤家路",
    difficulty: 1,
  },
  {
    id: 5,
    question: "什么东西天气越热它爬得越高？",
    options: ["猴子", "蚂蚁", "温度计", "爬山虎"],
    answer: "温度计",
    difficulty: 1,
  },
  {
    id: 6,
    question: "什么人始终不敢洗澡？",
    options: ["泥人", "病人", "懒人", "老人"],
    answer: "泥人",
    difficulty: 1,
  },
  {
    id: 7,
    question: "什么布剪不断？",
    options: ["棉布", "瀑布", "丝绸", "帆布"],
    answer: "瀑布",
    difficulty: 1,
  },
  {
    id: 8,
    question: "什么帽不能戴？",
    options: ["草帽", "螺丝帽", "皮帽", "安全帽"],
    answer: "螺丝帽",
    difficulty: 1,
  },
  {
    id: 9,
    question: "什么花不结果？",
    options: ["桃花", "雪花", "梨花", "菊花"],
    answer: "雪花",
    difficulty: 1,
  },
  {
    id: 10,
    question: "什么鸡没有翅膀？",
    options: ["烤鸡", "田鸡", "公鸡", "母鸡"],
    answer: "田鸡",
    difficulty: 1,
  },
  {
    id: 11,
    question: "什么笔不能写字？",
    options: ["毛笔", "钢笔", "电笔", "铅笔"],
    answer: "电笔",
    difficulty: 1,
  },
]

const mediumQuestions: Question[] = [
  {
    id: 12,
    question: "什么动物天天熬夜？",
    options: ["猫头鹰", "熊猫", "蝙蝠", "老鼠"],
    answer: "熊猫",
    difficulty: 2,
  },
  {
    id: 13,
    question: "什么东西能装下整个世界却只有手掌大小？",
    options: ["地图", "手机", "书本", "地球仪"],
    answer: "地图",
    difficulty: 2,
  },
  {
    id: 14,
    question: "什么船最安全？",
    options: ["航空母舰", "停泊的船", "潜水艇", "救生艇"],
    answer: "停泊的船",
    difficulty: 2,
  },
  {
    id: 15,
    question: "什么海没有水？",
    options: ["死海", "辞海", "红海", "地中海"],
    answer: "辞海",
    difficulty: 2,
  },
  {
    id: 16,
    question: "什么样的桶子永远装不满？",
    options: ["水桶", "马桶", "无底桶", "铁桶"],
    answer: "马桶",
    difficulty: 2,
  },
  {
    id: 17,
    question: "什么桥下没有水？",
    options: ["石桥", "立交桥", "木桥", "铁桥"],
    answer: "立交桥",
    difficulty: 2,
  },
  {
    id: 18,
    question: "什么鱼不能吃？",
    options: ["鲨鱼", "木鱼", "鲸鱼", "带鱼"],
    answer: "木鱼",
    difficulty: 2,
  },
  {
    id: 19,
    question: "什么水不能喝？",
    options: ["热水", "冰水", "薪水", "矿泉水"],
    answer: "薪水",
    difficulty: 2,
  },
  {
    id: 20,
    question: "什么东西你越是着急它越是不来？",
    options: ["公交车", "灵感", "快递", "下雨"],
    answer: "灵感",
    difficulty: 2,
  },
  {
    id: 21,
    question: "什么牛不会耕地？",
    options: ["水牛", "黄牛", "蜗牛", "奶牛"],
    answer: "蜗牛",
    difficulty: 2,
  },
]

const hardQuestions: Question[] = [
  {
    id: 22,
    question: "什么人一年只工作一天？",
    options: ["老师", "圣诞老人", "总统", "邮递员"],
    answer: "圣诞老人",
    difficulty: 3,
  },
  {
    id: 23,
    question: "什么东西有头无脚？",
    options: ["蛇", "蜗牛", "钉子", "蚯蚓"],
    answer: "钉子",
    difficulty: 3,
  },
  {
    id: 24,
    question: "什么话全世界都能听懂？",
    options: ["英语", "音乐", "汉语", "数学"],
    answer: "音乐",
    difficulty: 3,
  },
  {
    id: 25,
    question: "什么人不怕冷？",
    options: ["北极人", "雪人", "企鹅", "爱斯基摩人"],
    answer: "雪人",
    difficulty: 3,
  },
  {
    id: 26,
    question: "什么东西有脚却不会走路？",
    options: ["桌子", "蜈蚣", "螃蟹", "青蛙"],
    answer: "桌子",
    difficulty: 3,
  },
  {
    id: 27,
    question: "什么火看不见？",
    options: ["鬼火", "无名火", "萤火", "灯火"],
    answer: "无名火",
    difficulty: 3,
  },
  {
    id: 28,
    question: "什么树没有年轮？",
    options: ["棕榈树", "松树", "柏树", "柳树"],
    answer: "棕榈树",
    difficulty: 3,
  },
  {
    id: 29,
    question: "什么东西你越生气它就越大？",
    options: ["脾气", "气球", "火", "肚子"],
    answer: "脾气",
    difficulty: 3,
  },
  {
    id: 30,
    question: "什么车寸步难行？",
    options: ["风车", "赛车", "卡车", "自行车"],
    answer: "风车",
    difficulty: 3,
  },
]

export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const QUESTIONS_PER_LEVEL = 5
export const TOTAL_LEVELS = 5
export const TIME_PER_QUESTION = 15
export const POINTS_PER_CORRECT = 10
export const TOTAL_QUESTIONS = QUESTIONS_PER_LEVEL * TOTAL_LEVELS

const allQuestions: Question[] = [
  ...easyQuestions,
  ...mediumQuestions,
  ...hardQuestions,
]

export function getRandomQuestions(): Question[] {
  const shuffled = shuffleArray(allQuestions)
  return shuffled.slice(0, TOTAL_QUESTIONS)
}
