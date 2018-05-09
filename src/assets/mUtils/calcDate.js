/**
 * Created by yubh on 2018/4/3.
 */
export default function  DateAdd(interval,number,date)
{
  /*
   *---------------  DateAdd(interval,number,date)  -----------------
   *  DateAdd(interval,number,date)
   *  功能:实现VBScript的DateAdd功能.
   *  参数:interval,字符串表达式，表示要添加的时间间隔.
   *  参数:number,数值表达式，表示要添加的时间间隔的个数.
   *  参数:date,时间对象.
   *  返回:新的时间对象.
   *  var  now  =  new  Date();
   *  var  newDate  =  DateAdd( "d ",5,now);
   *  author:wanghr100(灰豆宝宝.net)
   *  update:2004-5-28  11:46
   *---------------  DateAdd(interval,number,date)  -----------------
   */
  switch(interval)
  {
    case  "y "  :  {
      date.setFullYear(date.getFullYear()+number);
      return  date;
      break;
    }
    case  "q "  :  {
      date.setMonth(date.getMonth()+number*3);
      return  date;
      break;
    }
    case  "m "  :  {
      date.setMonth(date.getMonth()+number);
      return  date;
      break;
    }
    case  "w "  :  {
      date.setDate(date.getDate()+number*7);
      return  date;
      break;
    }
    case  "d "  :  {
      date.setDate(date.getDate()+number);
      return  date;
      break;
    }
    case  "h "  :  {
      date.setHours(date.getHours()+number);
      return  date;
      break;
    }
    case  "m "  :  {
      date.setMinutes(date.getMinutes()+number);
      return  date;
      break;
    }
    case  "s "  :  {
      date.setSeconds(date.getSeconds()+number);
      return  date;
      break;
    }
    default  :  {
      date.setDate(d.getDate()+number);
      return  date;
      break;
    }
  }
}
// var  now  =  new  Date();
// //加五天.
// var  newDate  =  DateAdd( "d ",5,now);
// alert(newDate.toLocaleDateString())
// //加两个月.
// newDate  =  DateAdd( "m ",2,now);
// alert(newDate.toLocaleDateString())
// //加一年
// newDate  =  DateAdd( "y ",1,now);
// alert(newDate.toLocaleDateString())
