import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Select, { SingleValue } from 'react-select'
import { 
  love_par_heart,
  countstop_heart,
} from '../src/functions'
import { musicList } from '../src/assets/musicList.json'

function App() {
  const music_title_list: string[] = Object.keys(musicList);
  const options = music_title_list.map(title => { return {value: title, label: title }});
  const [music_title, set_music_title] = useState('');
  const [count_stop, set_count_stop] = useState<{attract: number, heart: number}[]>([]);

  interface formData {
    mastary_bonus: number,
    love_bonus: number,
    smile: number,
    cool: number,
    pure: number,
    voltage: number,
    attract_lower: number,
    attract_upper: number
  }

  const { register, handleSubmit }  = useForm<formData>({})

  return (
    <>
      <p>一度の獲得 Love がカンストするのに必要な<br/>ラブアトラクトとハートの量を計算します</p>
      <form
        onSubmit={
          handleSubmit(data => {
            for(const props in data) {
              data[props] = Number(data[props])
            }
            console.log(data)
            const stats = data.smile + data.pure + data.cool;
            const LpH = love_par_heart(stats, musicList[music_title].member, musicList[music_title].time);
            const tmp = []
            for(let attract: number = data.attract_lower; attract <= data.attract_upper; attract += 50){
              const heart = countstop_heart(attract, data.voltage, LpH, data.mastary_bonus, data.love_bonus);
              tmp.push({attract: attract, heart: heart})
              console.log(attract, heart)
            }
            set_count_stop(tmp)
            }
          )}>
        <label>楽曲タイトル</label><div></div>
        <Select options={options} onChange={
          (e: SingleValue<{value: string, label: string }>) => set_music_title(e!.value) } 
        />
        <p><b>ラーニング</b></p>
        <div>
          <label>マスタリーレベル</label>
          <input
            required={true}
            {...register('mastary_bonus')}
            type='number'
          />
          <label>Loveボーナス</label>
          <input
            required={true}
            type='number'
            {...register('love_bonus')}
          />
        </div>
        <p><b>ステータス</b></p>
        <div>
          <label>スマイル</label>
          <input
            required={true}
            {...register('smile')}
            type='number'
          />
          <label>ピュア</label>
            <input
              required={true}
              {...register('pure')}
              type='number'
            />
          <label>クール</label>
          <input
            required={true}
            {...register('cool')}
            type='number'
          />
        </div>
        <div>
        <p><b>ラブアトラクト</b></p>
        <label>下限</label>
        <input
          {...register('attract_lower')}
          type='number'
        />
        
        <label>上限</label>
        <input
          {...register('attract_upper')}
          type='number'
        />
        </div>
        <div className={'button'}>
          <button type="submit">計算する</button>
        </div>
      </form>
      
      <table>
        <thead>
          <tr><td>ラブアトラクト</td><td>ハート</td></tr>
        </thead>
        <tbody>
        {
          count_stop.map(data => <tr key={data.attract}><td>{data.attract}</td><td>{data.heart}</td></tr>)
        }
        </tbody>
      </table>
    </>
  )
}

export default App
