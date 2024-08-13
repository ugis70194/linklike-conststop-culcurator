export function love_ratio(
  voltage: number,
  heart: number,
  isFever = false
): number {
  if (isFever) voltage *= 2
  if (voltage * heart >= 720) {
    return 3.5
  } else if (voltage * heart >= 360) {
    return 3.0
  } else if (voltage * heart >= 200) {
    return 2.5
  } else if (voltage * heart >= 100) {
    return 2.0
  }
  return 1.0
}

export function music_filter(
  music_title_list: string[],
  substring: string
): string[]
{
  return music_title_list.filter(title => title.indexOf(substring) > -1)
}

export function love_par_heart(
  appeal_sum: number,
  member: number,
  time: number
): number
{
  return Math.ceil((120*appeal_sum)/(member*time))
}

// よくわからんが 2% くらいずれる
export function calculate_love(
  love_attract: number,
  heart_count: number,
  ratio: number,
  LpH: number,
  masterly_bonus: number,
  love_bonus: number
): number {
  const base_love = Math.ceil(ratio * heart_count * LpH)
  const love = base_love * (1.0+masterly_bonus/100.0) * (1.0+love_bonus/100.0)
  return Math.ceil(1.018 * love * (1.0+love_attract/100.0))
}

export function countstop_attract(
  heart_count: number,
  voltage: number,
  LpH: number,
  masterly_bonus: number,
  love_bonus: number
): number {
  let lower = 0
  let upper = 20000
  const MAX = Math.pow(2, 31)
  const ratio = love_ratio(voltage, heart_count, false);
  while(upper - lower > 1) {
    const mid = Math.floor((lower + upper) / 2)
    const love = calculate_love(mid, heart_count, ratio, LpH, masterly_bonus, love_bonus)
    
    if(love <= MAX) lower = mid
    else upper = mid
  }
  return lower
}

export function countstop_heart(
  love_attract: number,
  voltage: number,
  LpH: number,
  masterly_bonus: number,
  love_bonus: number
): number {
  let lower = 0
  let upper = 999
  const MAX = Math.pow(2, 31)
  while(upper - lower > 1) {
    const mid = Math.floor((lower + upper) / 2)
    const ratio = love_ratio(voltage, mid, false);
    const love = calculate_love(love_attract, mid, ratio, LpH, masterly_bonus, love_bonus)
    
    if(love <= MAX) lower = mid
    else upper = mid
  }
  return lower
}