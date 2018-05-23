<template>
    <div class="container">
        <div class="perfect">
            <div class="id_num">
                <p class="id_name">
                    <span>姓 名：</span>
                    <span class="id_txt">
                        <input type="text"
                               placeholder="请输入姓名">
                    </span>
                </p>
            </div>
            <div class="id_num">
                <p class="id_name">
                    <span>年 龄：</span>
                    <span class="id_txt">
                        <input type="text"
                               placeholder="请输入年龄">
                    </span>
                </p>
            </div>
            <div class="id_num">
                <p class="id_name">
                    <span>生 日：</span>
                    <span class="id_txt">
                        <input type="text"
                               placeholder="请输入生日">
                    </span>
                </p>
            </div>
            <div class="id_num">
                <p class="id_name">
                    <span>电 话：</span>
                    <span class="id_txt">
                        <input type="text"
                               placeholder="请输入电话">
                    </span>
                </p>
            </div>
            <div class="id_num">
                <p class="id_name">
                    <span>邮 箱：</span>
                    <span class="id_txt">
                        <input type="text"
                               placeholder="请输入邮箱">
                    </span>
                </p>
            </div>
            <div class="id_num">
                <p class="id_name">
                    <span>店院名称：</span>
                    <span class="id_txt id_ple">
                        <input type="text"
                               placeholder="请输入店院名称">
                    </span>
                </p>
            </div>
            <div class="id_num">
                <p class="id_name">
                    <span>店院地址：</span>
                    <span class="id_txt id_ple">
                        <input type="text"
                               placeholder="请输入店院地址">
                    </span>
                </p>
            </div>
            <div class="year_nums">
                <div class="year_lef">
                    <span class="manag"> 经营年限：</span>
                </div>
                <div class="year_rig">
                    <p class="new_year">
                        <span class="new_name">新开业</span>
                        <span class="new_name">1年以内</span>
                        <span class="new_name">1~3年</span>
                    </p>
                    <p class="year_new">
                        <span class="new_name">3~5年</span>
                        <span class="new_name">5~10年</span>
                        <span class="new_name">新开业</span>
                    </p>
                </div>
            </div>
            <div class="year_nums">
                <div class="year_lef">
                    <span class="manag"> 经营面积：</span>
                </div>
                <div class="year_rig">
                    <p class="new_year">
                        <span class="new_name">50</span>
                        <span class="new_name">50-100</span>
                        <span class="new_name">100-200</span>
                    </p>
                    <p class="year_new">
                        <span class="new_name">200-500</span>
                        <span class="new_name">500-1000</span>
                        <span class="new_name">1000以上</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="next_up">
            <span class="next_nex">下一步</span>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
.container {
  width: 100%;
  height: auto;
  height: calc(100% - 0.88rem);
  background: #fff;
}
.perfect {
  width: 7.068rem;
  height: 10.34rem;
  box-shadow: 0 2px 9px 0 #eeeeee;
  border-radius: 3px;
  margin: 0.2rem auto 0;
  margin-top: 0.2rem;
}
.id_num {
  width: 7.068rem;
  height: 0.88rem;
  line-height: 0.88rem;
  border-bottom: 1px solid #f7f7f7;
}
.id_name {
  margin-left: 20px;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.id_txt {
  margin-left: 20px;
  font-size: 14px;
  color: #cccccc;
  letter-spacing: 0;
}
.id_txt input {
  width: 4rem;
  height: 0.88rem;
  line-height: 0.88rem;
  border: 0;
  outline: none;
  border-bottom: 1px solid #f7f7f7;
  border-right: 0;
}
.id_ple {
  margin-left: 0px;
}
.year_nums {
  width: 7.068rem;
  height: 1.6rem;
  margin: 0.2rem auto 0;
  border: 1px solid #f7f7f7;
  border-bottom: 1px solid #f7f7f7;
  display: flex;
  justify-content: space-between;
}
.year_lef {
  width: 23%;
  height: 1.6rem;
}
.year_rig {
  width: 78%;
  height: 1.6rem;
}
.manag {
  margin: 0.1rem;
  font-size: 14px;
  color: #666666;
  letter-spacing: 0;
}
.new_year {
  display: flex;
  justify-content: space-between;
  padding: 2px 5px;
}
.year_new {
  display: flex;
  justify-content: space-between;
  padding: 2px 5px;
}
.new_name {
  border: 1px solid #ccc;
  width: 80px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #cccccc;
  border-radius: 3px;
  text-align: center;
}
.next_up {
  margin-top: 0.3rem;
  text-align: center;
}
.next_nex {
  width: 2.4rem;
  height: 0.72rem;
  line-height: 0.72rem;
  padding: 0.2rem 0.7rem;
  background: #ffffff;
  border: 1px solid #fd4689;
  border-radius: 3px;
  font-size: 0.3rem;
  color: #fd4689;
  letter-spacing: 0;
}
</style>
