export const cnLanguages = {
  US: "英语",
  ES: "西班牙语",
  CN: "中国人",
  resultOption:
    "我们没有找到任何符合您搜索条件的学生。请检查您的拼写或尝试创建一个新学生.",
  login_warning: "您需要登录才能访问学生注册表.",
  error_404: "错误 404. 找不到页面.",
  error_students:
    "我们找不到与您的电话号码关联的学生记录. 我们建议您为您的学生创建一个新记录. 您可以通过电子邮件向我们发送有关此问题的信息.",
  parent_coach_title: "验证您的身份. 请稍等",
  parent_coach_option: "验证您的身份. 请稍等",
  parent_option: "爸爸/导师",
  coach_option: "教练",
  new_option: "新的",
  returningModal: {
    modal_title: "找到學生記錄",
    modal_text:
      "我們發現學生記錄已經與您的手機號碼相關聯. 請查看您正在註冊的學生是否已經存在，並通過簡單地更新來節省您的時間.",
    modal_close_button: "好的",
    add_student_button: "添加新學生",
  },
  returning_option: "返回",
  new_returning_option: "新的还是现有的?",
  new_returning_title: "选择您是开始新的学生注册还是更新返回的学生注册.",
  new_returning_sub_heading: "笔记: 请等待几分钟，然后再尝试查看或编辑新记录.",
  steps_1: "验证您的角色",
  steps_2: "选择新的或现有的",
  steps_3: "填写表格",
  button_continue: "继续",
  button_back: "背部",
  button_submit: "提交",
  logout_modal: {
    modal_title: "您确定要退出吗?",
    modal_text: "所做的任何更改都不会保存.",
    modal_cancel_button: "取消",
    modal_confirm_button: "登出",
  },
  waiverText: {
    waiver: "查看並接受分數條款和條件.",
    newwaiver: "條款和條件已更新. 請查看並接受它們.",
  },
  register_modal_success: {
    modal_title: "注册成功",
    modal_text: "该学生已成功注册",
    modal_footer: "请等待几分钟，然后再尝试查看或编辑新记录.",
    modal_cancel_button: "添加其他学生",
    modal_confirm_button: "完毕",
  },
  edit_modal_success: {
    modal_title: "成功编辑",
    modal_text: "学生已成功编辑.",
    modal_cancel_button: "添加/编辑其他学生",
    modal_confirm_button: "完毕",
  },
  error_modal: {
    error_500: {
      modal_title: "服务器错误 [500]",
      modal_text:
        "我们的服务器有问题. 如果这种情况持续存在，请联系我们 " +
        '<a href="https://scoresu.org/contact" target="_blank">这里</a> ',
      modal_close_button: "塞拉尔",
    },
    error_409: {
      modal_title: "服务器错误 [409]",
      modal_text: "该学生已经在系统中，请联系您的教练或管理员.",
      modal_close_button: "塞拉尔",
    },
  },
  form: {
    required_fields: "必填项(*)",
    invalid_phone_number: "电话号码无效",
    required_waiver: "您需要查看并接受弃权(*)",
    invalid_email: "电子邮件无效",
    firstName_field: "名*",
    firstName_field_placeholder: "输入名字",
    middleName_field: "中间名字",
    middleName_field_placeholder: "输入中间名",
    lastName_field: "姓*",
    lastName_field_placeholder: "输入姓氏",
    schoolName_field: "分数计划网站",
    schoolName_region_field: "地区*",
    schoolName_region_field_placeholder: "选择...",
    schoolName_schoolname_field: "学校名称*",
    schoolName_schoolname_field_placeholder: "选择...",
    attendingSchool_field: "你就读的学校*",
    attendingSchool_field_placeholder: "进入你就读的学校",
    studentEmail_field: "学生邮箱",
    studentEmail_field_placeholder: "输入学生邮箱",
    studentphoneNumber_field: "学生电话",
    studentphoneNumber_field_placeholder: "输入学生电话",
    birthdate_field: "出生日期*",
    birthdate_field_placeholder: "出生日期",
    gender_field: "性别*",
    gender_field_placeholder: "选择...",
    grade_field: "年级*",
    grade_field_placeholder: "选择...",
    ethnicity_field: "种族*",
    ethnicity_field_placeholder: "选择...",
    reducedPriceLunch_field: "您的孩子是否接受免费或减价午餐?*",
    reducedPriceLunch_field_placeholder_confirm: "是的",
    reducedPriceLunch_field_placeholder_denied: "不",
    allergies_field: "过敏/健康状况",
    allergies_field_placeholder: "输入过敏/医疗状况",
    parentFName_field: "家长/监护人名字*",
    parentFName_field_placeholder: "输入父母/监护人的名字",
    parentLName_field: "家长/监护人姓氏*",
    parentLName_field_placeholder: "输入父母/监护人的姓氏",
    parentEmail_field: "家长/监护人电子邮件*",
    parentEmail_field_placeholder: "输入家长/监护人电子邮件",
    relationship_field: "关系到孩子*",
    relationship_field_placeholder: "选择...",
    parentPhone1_field: "家长/监护人电话 1*",
    parentPhone1_field_placeholder: "输入家长/监护人电话 1",
    parentPhone2_field: "家长/监护人电话 2",
    parentPhone2_field_placeholder: "输入家长/监护人电话 2",
    mailingStreet_field: "邮寄街",
    mailingStreet_field_placeholder: "进入邮寄街",
    mailingCity_field: "邮寄城市",
    mailingCity_field_placeholder: "输入邮寄城市",
    mailingState_field: "邮寄州/省",
    mailingState_field_placeholder: "输入邮寄州/省",
    mailingZip_field: "邮寄邮编",
    mailingZip_field_placeholder: "输入邮寄邮编",
    mailingCountry_field: "邮寄国家",
    parentHomeLang_field: "家长/监护人家庭语言*",
    parentHomeLang_field_placeholder: "选择...",
    parentHomeLang_field_input_placeholder: "输入父母/监护人的家庭语言",
    volunteer_field: "自愿参加这个计划? (家长监护人)",
    volunteer_field_placeholder_confirm: "是的",
    volunteer_field_placeholder_denied: "不",
    emergency_Contact_Name_field:
      "主要紧急联系人姓名（家长/监护人和主要紧急联系人除外)*",
    emergency_Contact_Name_field_placeholder: "输入紧急联系人姓名",
    emergency_Contact_Relationship_field: "与孩子的紧急关系*",
    emergency_Contact_Relationship_field_placeholder: "选择...",
    emergency_Contact_Phone1_field: "紧急联络电话 1*",
    emergency_Contact_Phone1_field_placeholder: "输入紧急联络电话 1",
    emergency_Contact_Phone2_field: "紧急联络电话 2",
    emergency_Contact_Phone2_field_placeholder: "输入紧急联络电话 2",
    second_Emergency_Contact_Name_field: "次要紧急联系人姓名",
    second_Emergency_Contact_Name_field_placeholder: "输入第二紧急联系人姓名",
    second_Emergency_Contact_Relationship_field: "与孩子的次要紧急关系",
    second_Emergency_Contact_Relationship_field_placeholder: "选择...",
    second_Emergency_Contact_Phone1_field: "辅助紧急电话 1",
    second_Emergency_Contact_Phone1_field_placeholder: "输入第二紧急联络电话 1",
    second_Emergency_Contact_Phone2_field: "辅助紧急电话 2",
    second_Emergency_Contact_Phone2_field_placeholder: "输入第二紧急联络电话 2",
    waiver_field: "放弃",
    waiver_field_button: "显示豁免",
    formTitle1: "学生详情",
    formTitle2: "家长/监护人信息",
    formTitle3: "紧急联络人（家长/监护人除外)",
    formTitle4: "第二个紧急联系人（家长/监护人和主要紧急联系人除外)",
    requiredFieldsTitle: "缺少必填字段：",
    genderArray: [
      {
        label: "女性",
        value: "Female",
      },
      {
        label: "男性",
        value: "Male",
      },
      {
        label: "非二进制",
        value: "Non-binary",
      },
      {
        label: "宁愿不说",
        value: "Prefer not to say",
      },
      {
        label: "未知",
        value: "Unknown",
      },
    ],
    ethnicityArray: [
      {
        label: "非裔美国人",
        value: "African American",
      },
      {
        label: "亚洲人",
        value: "Asian",
      },
      {
        label: "白种人",
        value: "Caucasian",
      },
      {
        label: "菲律宾人",
        value: "Filipino",
      },
      {
        label: "西班牙裔/拉丁裔",
        value: "Hispanic/Latinx",
      },
      {
        label: "中东/阿拉伯语",
        value: "Middle Eastern/Arabic",
      },
      {
        label: "多种族/多民族",
        value: "Multi-Racial/Multi-Ethnic",
      },
      {
        label: "美洲原住民",
        value: "Native American",
      },
      {
        label: "太平洋岛民",
        value: "Pacific Islander",
      },
    ],
    relationshipArray: [
      {
        label: "家长",
        value: "Parent",
      },
      {
        label: "法定监护人",
        value: "Legal Guardian",
      },
      {
        label: "养父母",
        value: "Foster Parent",
      },
      {
        label: "祖父母",
        value: "Grandparent",
      },
      {
        label: "兄弟姐妹/其他亲属",
        value: "Sibling/Other relative",
      },
    ],
    parent_Home_Lang_Array: [
      {
        label: "阿拉伯",
        value: "Arabic",
      },
      {
        label: "孟加拉",
        value: "Bengali",
      },
      {
        label: "中国人",
        value: "Chinese (incl. Cantonese, Mandarin, other Chinese languages)",
      },
      {
        label: "英语",
        value: "English",
      },
      {
        label: "法语",
        value: "French and French Creole",
      },
      {
        label: "德语",
        value: "German",
      },
      {
        label: "希腊语",
        value: "Greek",
      },
      {
        label: "古吉拉特语",
        value: "Gujarati",
      },
      {
        label: "希伯来语",
        value: "Hebrew",
      },
      {
        label: "印地语",
        value: "Hindi",
      },
      {
        label: "苗族",
        value: "Hmong",
      },
      {
        label: "意大利语",
        value: "Italian",
      },
      {
        label: "日本人",
        value: "Japanese",
      },
      {
        label: "韩国人",
        value: "Korean",
      },
      {
        label: "波斯语",
        value: "Persian",
      },
      {
        label: "抛光",
        value: "Polish",
      },
      {
        label: "葡萄牙语",
        value: "Portuguese",
      },
      {
        label: "旁遮普语",
        value: "Punjabi",
      },
      {
        label: "俄语",
        value: "Russian",
      },
      {
        label: "西班牙语",
        value: "Spanish",
      },
      {
        label: "他加禄语",
        value: "Tagalog",
      },
      {
        label: "泰卢固语",
        value: "Telugu",
      },
      {
        label: "乌尔都语",
        value: "Urdu",
      },
      {
        label: "越南语",
        value: "Vietnamese",
      },
      {
        label: "其他",
        value: "Other",
      },
    ],
    waiverModal_confirm: "接受",
    waiverModal_denied: "解雇",
  },
  searchStudent: {
    title_parents: "选择一个学生来编辑他们的信息.",
    modal_title: "删除学生",
    modal_text: "请联系您的分数管理员以获取删除学生记录的帮助",
    modal_close_button: "好的",
    title: "按名字/姓氏搜索学生",
    inputProps: "搜索学生",
    inputPlaceholder: "搜索...",
    tableOptions: {
      firstName: "名",
      lastName: "姓",
      birthdate: "出生日期",
      schoolName: "学校名称",
      actions: "行动",
    },
  },
};
