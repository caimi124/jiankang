/**
 * 草药数据中文翻译辅助函数
 * 用于将英文草药数据翻译成中文
 */

// 草药名称翻译映射
export const herbNameTranslations: Record<string, string> = {
  // 常见草药
  'Ginger': '生姜',
  'Turmeric': '姜黄',
  'Ginseng': '人参',
  'Peppermint': '薄荷',
  'Chamomile': '洋甘菊',
  'Licorice Root': '甘草',
  'Cinnamon': '肉桂',
  'Clove': '丁香',
  'Pumpkin Seeds': '南瓜子',
  'Rhodiola Crenulata': '红景天',
  'Rhodiola': '红景天',
  'Ashwagandha': '南非醉茄',
  'Echinacea': '紫锥菊',
  'Onion': '洋葱',
  'Cordyceps': '虫草',
  'Astragalus': '黄芪'
}

// 草药功效翻译
export const benefitTranslations: Record<string, string> = {
  // 消化相关
  'Digestive Support': '消化支持',
  'Nausea Relief': '缓解恶心',
  'Bloating Relief': '缓解腹胀',
  'Improved Digestion': '改善消化',
  'Relieves nausea and motion sickness': '缓解恶心和晕动症',
  'Aids digestion and reduces bloating': '帮助消化并减少腹胀',
  
  // 炎症相关
  'Anti-inflammatory': '抗炎',
  'Reduces inflammation': '减轻炎症',
  'Joint Health': '关节健康',
  'Pain Relief': '疼痛缓解',
  
  // 能量相关
  'Energy Boost': '提升能量',
  'Reduces Fatigue': '减轻疲劳',
  'Stamina Enhancement': '增强耐力',
  'Natural sustained energy boost': '自然持久的能量提升',
  'Reduces fatigue and mental fog': '减轻疲劳和精神迷雾',
  
  // 压力相关
  'Stress Relief': '压力缓解',
  'Anxiety Reduction': '减轻焦虑',
  'Cortisol Balance': '皮质醇平衡',
  'Stress resilience and cortisol balance': '压力恢复力和皮质醇平衡',
  'Reduces stress and anxiety': '减轻压力和焦虑',
  
  // 认知相关
  'Mental Clarity': '心智清晰',
  'Focus Enhancement': '增强专注力',
  'Cognitive Support': '认知支持',
  'Mental clarity under pressure': '压力下的心智清晰',
  'Improves focus and concentration': '改善专注力和注意力',
  
  // 免疫相关
  'Immune Support': '免疫支持',
  'Cold Prevention': '预防感冒',
  'Infection Resistance': '抗感染',
  
  // 循环相关
  'Circulation Improvement': '改善循环',
  'Warming Properties': '温性特性',
  'Blood Flow Enhancement': '增强血流',
  
  // 睡眠相关
  'Sleep Quality': '睡眠质量',
  'Relaxation': '放松',
  'Calming Effects': '镇静效果',
  
  // 代谢相关
  'Metabolism Support': '代谢支持',
  'Blood Sugar Balance': '血糖平衡',
  'Weight Management': '体重管理',
  'Metabolism and weight management support': '代谢和体重管理支持',
  
  // 心血管相关
  'Heart Health': '心脏健康',
  'Blood Pressure Support': '血压支持',
  'Cholesterol Balance': '胆固醇平衡',
  
  // 女性健康
  'Hormonal Balance': '荷尔蒙平衡',
  'Menstrual Support': '经期支持',
  'Menopausal Support': '更年期支持',
  
  // 运动相关
  'Athletic Performance': '运动表现',
  'Physical stamina and endurance': '体力和耐力',
  'Post-workout Recovery': '运动后恢复',
  
  // 情绪相关
  'Mood Support': '情绪支持',
  'Mood and emotional stability': '情绪和情感稳定',
  'Emotional Balance': '情绪平衡',
  
  // 抗氧化
  'Antioxidant': '抗氧化',
  'Free Radical Protection': '自由基保护',
  
  // 其他
  'Adaptogenic': '适应原',
  'Natural Energy': '自然能量'
}

// 安全警告翻译
export const safetyWarningTranslations: Record<string, string> = {
  'Consult healthcare provider before use': '使用前请咨询医疗保健提供者',
  'Not recommended during pregnancy or breastfeeding': '孕期或哺乳期不建议使用',
  'May interact with blood thinners': '可能与血液稀释剂相互作用',
  'May interact with diabetes medications': '可能与糖尿病药物相互作用',
  'Avoid if allergic to related plants': '如对相关植物过敏请避免使用',
  'May cause digestive upset in high doses': '高剂量可能引起消化不适',
  'Not suitable for children under 12': '不适合12岁以下儿童',
  'May lower blood pressure': '可能降低血压',
  'May affect hormone levels': '可能影响激素水平',
  'Consult healthcare provider': '请咨询医疗保健提供者',
  'Always consult healthcare provider': '请始终咨询医疗保健提供者'
}

// 适用人群翻译
export const suitableForTranslations: Record<string, string> = {
  'Adults seeking natural energy': '寻求自然能量的成年人',
  'People with chronic fatigue': '慢性疲劳患者',
  'Athletes and active individuals': '运动员和活跃人士',
  'Stressed professionals': '压力大的职业人士',
  'Students during exam periods': '考试期间的学生',
  'People with digestive issues': '有消化问题的人',
  'Those experiencing stress or anxiety': '经历压力或焦虑的人',
  'Individuals with joint pain': '关节疼痛患者',
  'Those seeking immune support': '寻求免疫支持的人',
  'People with cold hands and feet': '手脚冰冷的人',
  'General use': '一般使用',
  'Adults seeking wellness support': '寻求健康支持的成年人'
}

// 不适用人群翻译
export const notSuitableForTranslations: Record<string, string> = {
  'Pregnant or breastfeeding women': '孕妇或哺乳期妇女',
  'Children under 12 years': '12岁以下儿童',
  'People on blood thinners': '服用血液稀释剂的人',
  'Those with bleeding disorders': '出血性疾病患者',
  'Individuals with autoimmune conditions': '自体免疫疾病患者',
  'People with thyroid disorders': '甲状腺疾病患者',
  'Those on immunosuppressants': '服用免疫抑制剂的人',
  'Individuals scheduled for surgery': '计划手术的人',
  'People with low blood pressure': '低血压患者',
  'Those allergic to related plants': '对相关植物过敏的人',
  'Consult healthcare provider': '请咨询医疗保健提供者'
}

// 剂型翻译
export const dosageFormTranslations: Record<string, string> = {
  'Capsules': '胶囊',
  'Tablets': '片剂',
  'Powder': '粉末',
  'Tea': '茶',
  'Tincture': '酊剂',
  'Extract': '提取物',
  'Fresh Root': '鲜根',
  'Dried Root': '干根',
  'Oil': '油',
  'Supplement': '补充剂',
  'As directed': '按说明使用',
  'Follow label': '遵循标签',
  'Follow label or practitioner guidance': '遵循标签或医师指导',
  'Consult practitioner': '咨询医师'
}

// 体质类型翻译
export const constitutionTypeTranslations: Record<string, string> = {
  'General': '一般',
  'Qi Deficiency': '气虚',
  'Yang Deficiency': '阳虚',
  'Yin Deficiency': '阴虚',
  'Damp-Heat': '湿热',
  'Blood Stasis': '血瘀',
  'Phlegm-Dampness': '痰湿',
  'Qi Stagnation': '气滞',
  'Special Constitution': '特禀质',
  'Balanced': '平和质'
}

// 翻译函数
export function translateHerbName(name: string): string {
  return herbNameTranslations[name] || name
}

export function translateBenefit(benefit: string): string {
  return benefitTranslations[benefit] || benefit
}

export function translateSafetyWarning(warning: string): string {
  return safetyWarningTranslations[warning] || warning
}

export function translateSuitableFor(text: string): string {
  return suitableForTranslations[text] || text
}

export function translateNotSuitableFor(text: string): string {
  return notSuitableForTranslations[text] || text
}

export function translateDosageForm(form: string): string {
  return dosageFormTranslations[form] || form
}

export function translateConstitutionType(type: string): string {
  return constitutionTypeTranslations[type] || type
}

// 翻译整个草药数据对象
export function translateHerbData(herbData: any): any {
  if (!herbData) return herbData

  return {
    ...herbData,
    // 保留英文名称作为备用
    english_name: herbData.name,
    // 翻译主要名称（如果有中文名就用中文名）
    name: herbData.chinese_name || translateHerbName(herbData.name),
    // 翻译功效列表
    benefits: herbData.benefits?.map((b: string) => translateBenefit(b)) || [],
    // 翻译适用人群
    suitable_for: herbData.suitable_for?.map((s: string) => translateSuitableFor(s)) || [],
    // 翻译不适用人群
    not_suitable_for: herbData.not_suitable_for?.map((n: string) => translateNotSuitableFor(n)) || [],
    // 翻译安全警告
    safety_warnings: herbData.safety_warnings?.map((w: string) => translateSafetyWarning(w)) || [],
    // 翻译剂型
    dosage_forms: herbData.dosage_forms?.map((d: any) => ({
      ...d,
      form: translateDosageForm(d.form),
      usage: translateDosageForm(d.usage)
    })) || [],
    // 翻译体质匹配
    constitution_match: herbData.constitution_match?.map((c: any) => ({
      ...c,
      type: translateConstitutionType(c.type)
    })) || [],
    // 翻译属性
    properties: herbData.properties?.map((p: string) => translateBenefit(p)) || []
  }
}

// 导出所有翻译映射供其他模块使用
export const translations = {
  herbNames: herbNameTranslations,
  benefits: benefitTranslations,
  safetyWarnings: safetyWarningTranslations,
  suitableFor: suitableForTranslations,
  notSuitableFor: notSuitableForTranslations,
  dosageForms: dosageFormTranslations,
  constitutionTypes: constitutionTypeTranslations
}

