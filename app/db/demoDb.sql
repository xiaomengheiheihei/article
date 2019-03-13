/*
 Navicat MySQL Data Transfer

 Source Server         : mySql
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : demoDb

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 13/03/2019 10:35:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `articleId` int(10) NOT NULL AUTO_INCREMENT,
  `keyWord` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createTime` char(255) DEFAULT NULL,
  `view` int(255) DEFAULT '100',
  `orign` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '原创',
  `classification` varchar(255) DEFAULT '技术',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  PRIMARY KEY (`articleId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (4, 'js', '描述', '第一条数据', '1551347960058', 100, '原创', '技术', '### 三级标题');
INSERT INTO `article` VALUES (5, 'js', '描述1', '第二条数据', '1551347978840', 100, '原创', '技术', '### ### ### ### 三级标题');
INSERT INTO `article` VALUES (6, '懒加载，js', '原生实现懒加载及其原理', '懒加载原理', '1551412392378', 100, '原创', '技术', '### 懒加载原理\n1. 原生实现\n关于一些距离的获取\n```\n document.documentElement.clientHeight   &&  document.body.clientHeight  // 网页可见区域高度\n document.body.offsetHeight                 // 网页可见区域高度（包括边线）\n document.body.scrollHeight                 // 网页正文全文高\n document.body.scrollTop   && document.documentElement.scrollTop    // 网页被卷去的高,前者ie下有兼容问题，后者chrome下有兼容问题，最好同时使用\n```\n> 获取将要进行懒加载元素的offsetTop，即到页面顶端的距离，然后获取页面被卷起的高度加上网页可见区域高度，两个距离做比较，当offsetTop即将等于卷起加上可见区域的高度的距离时，将data-src的正确链接地址赋值给src属性。');
INSERT INTO `article` VALUES (7, '移动端', '移动端适配retina屏，实现1px边框圆角', '移动端适配retina屏，实现1px边框圆角', '1551412531929', 100, '原创', '技术', '### 2、移动端适配retina屏，实现1px边框圆角\n1. 用伪元素实现。（对元素直接scale依然会占据空间,影响后续布局）\n```\n.box {\n  overflow: hidden;\n  display: inline-block;\n  width: 100px;\n  height: 100px;\n}\n\n.box:before {\n  z-index: -1;\n  content:\'\';\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 200%;\n  height: 200%;\n  background: #eee;\n  transform-origin: 0 0; \n  transform: scale(.5,.5);\n  border: 1px solid #000;\n  border-radius: 10px;\n}');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(255) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1001, 'admin', '', '123456');
INSERT INTO `user` VALUES (1002, 'ningdayuan', '', '123456');
INSERT INTO `user` VALUES (1003, 'test', '', '123456');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
