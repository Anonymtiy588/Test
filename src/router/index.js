import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/Identification/login.vue'
import register from '../views/Identification/register.vue'
import Reset from '../views/Identification/ResetPassword.vue'
import stumain from '../views/Student/main.vue' //学生主页面
import studata from '../views/Student/data.vue'
import noticeSchool from '../views/Student/notice/school.vue' // 学生学校通知
import noticeHr from '../views/Student/notice/hr.vue'	//学生企业通知
// import noticeInstructor from '../views/Student/notice/instructor.vue' //学生辅导员通知
import accountPersonal from '../views/Student/account/personal.vue' //学生个人信息
import accountMail from '../views/Student/account/mail.vue' //学生更改绑定邮箱
import accountPassword from '../views/Student/account/password.vue'
import enterprise from '../views/Enterprise/main.vue' //企业端主页面
import enterver from '../views/Enterprise/verification.vue' //企业端学历认证界面
import enterapply from '../views/Enterprise/apply.vue' //企业端申请页面
import newpassword from '../views/Identification/newpassword.vue'
import dataconfig from '../views/Student/dataconfig.vue' //学籍认证
Vue.use(VueRouter)

const routes = [{
	path: '/',
	name: 'login',
	component: login
}, {
	path: '/register',
	name: 'register',
	component: register
}, {
	path: '/Reset',
	name: 'Reset',
	component: Reset
},{
	path:'/newpassword',
	name:'newpassword',
	component:newpassword
},{
	//企业端
	path:'/Enterprise',
	name:'Enterprise',
	component:enterprise,
	children:[{
		path:'/Enterprise/verification',
		name:'Enterprise/verification',
		component:enterver
	},{
		path:'/Enterprise/apply',
		name:'Enterprise/apply',
		component:enterapply
	}]
}, {
	// 学生端主页面
	path: '/Student',
	name: 'Student',
	component: stumain,
	children: [{
		path: '/Student/studata',
		name: 'studata',
		component: studata
	},{
		path: '/Student/dataconfig',
		name: 'dataconfig',
		component: dataconfig
	},{
		// 学校通知
		path:'/Student/notice/school',
		name:'notice/school',
		component:noticeSchool		
	},{
		//企业通知
		path:'/Student/notice/hr',
		name:'notice/hr',
		component:noticeHr	
	},{
		//更改绑定邮箱
		path:'/Student/account/mail',
		name:'/account/mail',
		component:accountMail
	},{
		//更改密码
		path:'/Student/account/password',
		name:'/account/password',
		component:accountPassword
	},{
		//更改个人信息
		path:'/Student/account/personal',
		name:'/account/personal',
		component:accountPersonal
	}]
}]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
