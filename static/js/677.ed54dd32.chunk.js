"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[677],{5954:function(e,n){n.Z=function(){var e=new Date,n=String(e.getDate()).padStart(2,"0"),t=String(e.getMonth()+1).padStart(2,"0");return e.getFullYear()+"-"+t+"-"+n+" "+String(e.getHours()).padStart(2,"0")+":"+String(e.getMinutes()).padStart(2,"0")+":"+String(e.getSeconds()).padStart(2,"0")}},4677:function(e,n,t){t.r(n),t.d(n,{default:function(){return Z}});var r=t(5861),s=t(4942),a=t(1413),i=t(885),o=t(4687),u=t.n(o),l=t(2791),c=t(6871),d=t(5954),h=t(8287),m=t(9808),p=t(6231),x=t(5152),g=t(228),j=t(2861),q=t(9407),v=t(164),f=t(3872),b=t(184);var Z=function(e){var n=(0,l.useContext)(m.V),t=(0,h.x)(),o=t.isLoading,Z=t.error,k=t.sendRequest,y=t.clearError,T=(0,l.useState)({upVotes:0,downVotes:0,noOfAnswers:0,questionTitle:"",questionBody:"",questionTags:"",userPosted:"",userId:n.userId,answer:[{answerBody:"",userAnswered:"",userId:""}]}),S=(0,i.Z)(T,2),B=S[0],w=S[1];function C(e){var n=e.target,t=n.name,r=n.value;w((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,s.Z)({},t,r))}))}var I=(0,c.s0)(),A=function(){var e=(0,r.Z)(u().mark((function e(t){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.group(n.userId),e.prev=2,e.next=5,k("https://query-portal-backend.herokuapp.com/api/questions/","POST",JSON.stringify({questionTitle:B.questionTitle,questionBody:B.questionBody,questionTags:B.questionTags,askedOn:(0,d.Z)(),userId:n.userId}),{"Content-Type":"application/json",Authorization:"Bearer "+n.token});case 5:I("/home"),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(2);case 10:case"end":return e.stop()}}),e,null,[[2,8]])})));return function(n){return e.apply(this,arguments)}}();return(0,b.jsxs)(l.Fragment,{children:[(0,b.jsx)(p.Z,{error:Z,onClear:y}),(0,b.jsxs)("div",{className:"ask-ques-container",children:[(0,b.jsx)("h1",{children:"Ask a public Question"}),(0,b.jsx)("form",{onSubmit:A,children:(0,b.jsxs)("div",{className:"ask-form-container",children:[o&&(0,b.jsx)(x.Z,{asOverlay:!0}),(0,b.jsxs)("label",{htmlFor:"ask-ques-title",children:[(0,b.jsx)("h4",{children:"Title"}),(0,b.jsx)("p",{children:"Be specific and imagine you\u2019re asking a question to another person"}),(0,b.jsx)("input",{name:"questionTitle",onChange:C,value:B.questionTitle,type:"text",placeholder:"e.g. Is there an R function for finding the index of an element in a vector?",required:!0})]}),(0,b.jsxs)("label",{htmlFor:"ask-ques-body",children:[(0,b.jsx)("h4",{children:"Body"}),(0,b.jsx)("p",{children:"Include all the information someone would need to answer your question"}),(0,b.jsx)("textarea",{name:"questionBody",onChange:C,value:B.questionBody,cols:"30",rows:"7",required:!0})]}),(0,b.jsx)("h4",{children:"Program"}),(0,b.jsx)(g.Z,{sx:{minWidth:200,marginBottom:"2.5rem"},children:(0,b.jsxs)(v.Z,{sx:{minWidth:200,backgroundColor:"white"},children:[(0,b.jsx)(j.Z,{id:"demo-simple-select-label",children:"Program"}),(0,b.jsxs)(f.Z,{name:"questionTags",labelId:"questionTags-label",id:"questionTags",value:B.questionTags,label:"program",onChange:C,required:!0,children:[(0,b.jsx)(q.Z,{value:"b.tech",children:"B.Tech"}),(0,b.jsx)(q.Z,{value:"m.tech",children:"M.Tech"}),(0,b.jsx)(q.Z,{value:"mca",children:"MCA"}),(0,b.jsx)(q.Z,{value:"bca",children:"BCA"}),(0,b.jsx)(q.Z,{value:"diploma",children:"Diploma"}),(0,b.jsx)(q.Z,{value:"b.com",children:"B.Com"}),(0,b.jsx)(q.Z,{value:"m.com",children:"M.Com"}),(0,b.jsx)(q.Z,{value:"bba",children:"BBA"})]})]})}),(0,b.jsx)("button",{type:"submit",className:"submit-btn",children:"Submit"})]})})]})]})}}}]);
//# sourceMappingURL=677.ed54dd32.chunk.js.map