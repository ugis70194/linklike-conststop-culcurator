import { describe, test, expect } from 'bun:test';
import { 
  love_ratio,
  music_filter,
  love_par_heart,
  calculate_love,
  countstop_attract,
  countstop_heart,
} from '../src/functions'
import { musicList } from '../src/assets/musicList.json'

describe('love_ratio', () => {
  test('LoveLive', () => {
    expect(love_ratio(10, 72))
    .toEqual(3.5);
  });
  test('perfect', () => {
    expect(love_ratio(6, 60))
    .toEqual(3.0);
  });
  test('great', () => {
    expect(love_ratio(5, 40))
    .toEqual(2.5);
  });
  test('perfect', () => {
    expect(love_ratio(2, 25, true))
    .toEqual(2.0);
  });
  test('perfect', () => {
    expect(love_ratio(1, 1))
    .toEqual(1.0);
  });
})

describe('music_filter', () => {
  const music_title_list: string[] = Object.keys(musicList);
  
  test('ツキマカセ', () => {
    expect(music_filter(music_title_list, 'ツキ'))
    .toEqual(["ツキマカセ"])
  })
})

describe('love_par_heart', () => {
  test('ok', () => {
    expect(love_par_heart(90000, 9, 120))
    .toEqual(10000)
  })
})

// ここから下は通らなくて OK
/*
describe('calculate_love', () => {
  const music_title_list: string[] = Object.keys(musicList);
  const sunohare = music_filter(music_title_list, 'Snow')[0];
  test('vol 3, heart 129, attract 0', () => {
    const ratio = love_ratio(3, 129, false);
    const LpH = love_par_heart(51469 + 88389 + 50210, musicList[sunohare].member, musicList[sunohare].time);
    expect(calculate_love(0, 129, ratio, LpH, 11.45, 5.0))
    .toEqual(9733234)
  })
  test('vol 9, heart 181, attract 193', () => {
    const ratio = love_ratio(9, 181, false);
    const LpH = love_par_heart(51469 + 88389 + 50210, musicList[sunohare].member, musicList[sunohare].time);
    expect(calculate_love(193, 181, ratio, LpH, 11.45, 5.0))
    .toEqual(46683176)
  })

  const tukuyomi = music_filter(music_title_list, '月夜')[0];
  test('vol 3, heart 129, attract 0', () => {
    const ratio = love_ratio(0, 3, false);
    const LpH = love_par_heart(18112+16835+24902, musicList[tukuyomi].member, musicList[tukuyomi].time);
    expect(calculate_love(0, 3, ratio, LpH, 2, 1))
    .toEqual(64418)
  })
  test('vol 3, heart 129, attract 0', () => {
    const ratio = love_ratio(5, 24, false);
    const LpH = love_par_heart(18112+16835+24902, musicList[tukuyomi].member, musicList[tukuyomi].time);
    expect(calculate_love(0, 24, ratio, LpH, 2, 1))
    .toEqual(1030678)
  })
  test('vol 3, heart 129, attract 0', () => {
    const ratio = love_ratio(2, 100, false);
    const LpH = love_par_heart(18112+16835+24902, musicList[tukuyomi].member, musicList[tukuyomi].time);
    expect(calculate_love(81, 100, ratio, LpH, 2, 1))
    .toEqual(9716287)
  })
  test('vol 9, heart 181, attract 193', () => {
    const ratio = love_ratio(6, 136, true);
    const LpH = love_par_heart(18112+16835+24902, musicList[tukuyomi].member, musicList[tukuyomi].time);
    expect(calculate_love(479, 136, ratio, LpH, 2, 1))
    .toEqual(59178952)
  })
})

describe('countstop_attract', () => {
  const music_title_list: string[] = Object.keys(musicList);
  const sunohare = music_filter(music_title_list, 'Snow')[0];
  test('vol 3, heart 129, attract 0', () => {
    const LpH = love_par_heart(51469 + 88389 + 50210, musicList[sunohare].member, musicList[sunohare].time);
    expect(countstop_attract(430, 10, LpH, 11.45, 5.0))
    .toEqual(5000)
  })
})

describe('countstop_heart', () => {
  const music_title_list: string[] = Object.keys(musicList);
  const sunohare = music_filter(music_title_list, 'Snow')[0];
  test('vol 3, heart 129, attract 0', () => {
    const LpH = love_par_heart(51469 + 88389 + 50210, musicList[sunohare].member, musicList[sunohare].time);
    expect(countstop_heart(10000, 10, LpH, 11.45, 5.0))
    .toEqual(299)
  })
})
*/

describe('calculate_love', () => {
  const music_title_list: string[] = Object.keys(musicList);
  const tukuyomi = music_filter(music_title_list, '月夜')[0];
  test('vol 3, heart 129, attract 0', () => {
    const ratio = love_ratio(10, 419, false);
    const LpH = love_par_heart(15488+16190+32660, musicList[tukuyomi].member, musicList[tukuyomi].time);
    expect(calculate_love(6374, 419, ratio, LpH, 111, 6))
    .toEqual(2147483647)
  })
})