import formMiddlePromise from './myutil';
import axios from 'axios';
import NProgress from 'nprogress';
import Qs from 'qs';

let base = '';
// TODO
// let hotelBaseUrl = 'http://localhost:8080'; //测试
let hotelBaseUrl = 'http://114.116.15.130:8080/evaluate'; //发布
// process.env.NODE_ENV == 'development'
//     (base = 'localhost:8080'); //域名测试地址

// 接口地址
export { base };
export { hotelBaseUrl };
//登陆
export const requestLogin = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/user/login`, params, method);
};
//菜单
export const pjgzList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/quota/quotaList`, params, method);
};
//修改权重
export const weightEdit = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/quota/editWeight`, params, method);
};
//添加
export const addQuota = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/quota/addQuota`, params, method);
};
//修改
export const editQuota = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/quota/editQuota`, params, method);
};

// 学生信息管理list
export const stuList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/stu/stuList`, params, method);
};
// 学生信息管理增加
export const addStu = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/stu/addStu`, params, method);
};
// 学生信息管理编辑
export const editStu = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/stu/editStu`, params, method);
};
//学生个人基本信息
export const stuOne = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/stu/stuOne`, params, method);
};
//学生个人基本信息删除
export const delStu = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/stu/delStu`, params, method);
};
//学生评价List
export const scoreList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/stu/scoreList`, params, method);
};
//添加评分
export const addScore = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/stu/addScore`, params, method);
};

// 学级管理list
export const gradeList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/gradeList`, params, method);
};


// 班级list
export const teamList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/teamList`, params, method);
};
// 修改班级
export const editTeam = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/editTeam`, params, method);
};
// 添加班级
export const addTeam = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/addTeam`, params, method);
};
// 删除班级
export const delTeam = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/delTeam`, params, method);
};


// 用户设置
// 用户管理List
export const userList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/system/usersList`, params, method);
};
// 用户名是否被占用
export const existUser = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/system/existUser`, params, method);
};
// 新增用户
export const addUsers = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/system/addUsers`, params, method);
};
// 角色列表
export const roleList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/system/roleList`, params, method);
};



//  * 添加学级
export const addGrade = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/addGrade`, params, method);
};
//    * 修改学级
export const editGrade = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/editGrade`, params, method);
};
//    * 删除学级
export const delGrade = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/delGrade`, params, method);
};


// 字典查询
// 选择学级
export const dicGrade = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/dic/dicGrade`, params, method);
};
// 选择科系
export const dicDepartment = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/dic/dicDepartment`, params, method);
};
// 选择专业
export const dicSpecialty = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/dic/dicSpecialty`, params, method);
};
// 选择班级
export const dicTeam = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/dic/dicTeam`, params, method);
};
// 选择角色
export const dicRole = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/dic/dicRole`, params, method);
};
// 选择老师
export const usersList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/dic/usersList`, params, method);
};
//学期列表
export const termList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/termList`, params, method);
};
//删除字典
export const delQuota = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/quota/delQuota`, params, method);
};

// 根据专业选择班级
export const dicTeamZy = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/dic/dicTeamZy`, params, method);
};
// 根据班级选择学生
export const dicStu = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/dic/dicStu`, params, method);
};

//学院管理
//学级管理
export const collegeGradeList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/gradeList`, params, method);
};
//专业列表
export const specialtyList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/specialtyList`, params, method);
};
//修改专业
export const editSpecialty = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/editSpecialty`, params, method);
};
//添加专业
export const addSpecialty = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/addSpecialty`, params, method);
};
//添加专业
export const delSpecialty = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/delSpecialty`, params, method);
};
// 学院下的学期列表
export const xytermList = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/termList`, params, method);
};
// 学院下的学期列表修改
export const editTerm = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/editTerm`, params, method);
};
// 学院下的学期列表添加
export const addTerm = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/addTerm`, params, method);
};
// 学院下的学期列表删除
export const delTerm = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/college/delTerm`, params, method);
};


// 首页
export const makeTb = (params, method) => {
  return formMiddlePromise(`${hotelBaseUrl}/home/makeTb`, params, method);
};