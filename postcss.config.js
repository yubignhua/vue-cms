/**
 * Created by yubh on 2018/5/10.
 */
/**
 * Created by yubh on 2017/12/23.
 */

module.exports = ({ file, options, env })=>{
  if(env === 'production'){
    return {
      plugins: [
        require('autoprefixer'),
        require('cssnano'),
      ]
    }
  }else{
    return{
      plugins: [
        require('autoprefixer'),
        //require('cssnano'),
      ]
    }
  }
}
