import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as r,c as t,d as o}from"./app-tU1o2vQf.js";const a={},l=o('<h1 id="第3章-prometheus告警处理" tabindex="-1"><a class="header-anchor" href="#第3章-prometheus告警处理" aria-hidden="true">#</a> 第3章 Prometheus告警处理</h1><p>本章我们将带领读者探索Prometheus的告警处理机制，在前面的部分中已经介绍了告警能力在Prometheus的架构中被划分为两个部分，在Prometheus Server中定义告警规则以及产生告警，Alertmanager组件则用于处理这些由Prometheus产生的告警。Alertmanager即Prometheus体系中告警的统一处理中心。Alertmanager提供了多种内置第三方告警通知方式，同时还提供了对Webhook通知的支持，通过Webhook用户可以完成对告警更多个性化的扩展。</p><p>本章主要内容：</p><ul><li>在Prometheus中自定义告警规则</li><li>理解Alertmanager特性</li><li>基于标签的动态告警处理</li><li>将告警通知发送到第三方服务</li><li>如何使用Webhook扩展Alertmanager</li><li>以及一些其他的性能优化模式</li></ul>',4),i=[l];function s(h,n){return r(),t("div",null,i)}const u=e(a,[["render",s],["__file","index.html.vue"]]);export{u as default};