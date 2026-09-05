(()=>{
 window.EDITORIAL_EXTRA_START=words.length;
 const extra=[
 ['algorithmic','算法的','algorithmic bias','算法偏差'],['decarbonization','脱碳；减少碳排放','industrial decarbonization','工业脱碳'],
 ['greenwashing','漂绿；虚假环保宣传','corporate greenwashing','企业漂绿'],['misinformation','错误信息（不必然有意传播）','spread misinformation','传播错误信息'],
 ['disinformation','蓄意传播的虚假信息','a disinformation campaign','虚假信息宣传活动'],['upskilling','技能提升','employee upskilling','员工技能提升'],
 ['reskilling','重新学习岗位技能','workforce reskilling','劳动者技能再培训'],['telemedicine','远程医疗','access to telemedicine','获得远程医疗服务'],
 ['microplastic','微塑料','microplastic pollution','微塑料污染'],['cybersecurity','网络安全','cybersecurity risks','网络安全风险'],
 ['crowdfunding','众筹','a crowdfunding platform','众筹平台']];
 extra.forEach(([a,c,d,e])=>{if(!words.some(w=>w.a===a))words.push({a,b:'',c,d,e,f:'原创阅读拓展条目；不在本版基础词表中，不代表官方认定的超纲词。'})});
 window.EDITORIAL_EXTRA_END=words.length;
})();
