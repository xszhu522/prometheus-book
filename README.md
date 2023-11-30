---
home: true
icon: home fas
title: 项目主页
heroImage: /avatar.webp
#bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
#bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: prometheus-book
tagline: Prometheus操作指南
actions:
  - text: 开始阅读 💡
    link: /Introduction.md
    type: primary

copyright: false
footer: 使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-present Mr.Hope
---

# 目录

* [全书组织](Introduction.md)

## Part I - Prometheus基础

* [第1章 天降奇兵](./quickstart/README.md)
  * [Prometheus简介](./quickstart/why-monitor.md)
  * [初识Prometheus](./quickstart/prometheus-quick-start.md)
    * [安装Prometheus Server](./quickstart/install-prometheus-server.md)
    * [使用Node Exporter采集主机数据](./quickstart/use-node-exporter.md)
    * [使用PromQL查询监控数据](./quickstart/promql_quickstart.md)
    * [监控数据可视化](./quickstart/use-grafana-create-dashboard.md)
  * [任务和实例](./quickstart/prometheus-job-and-instance.md)
  * [Prometheus核心组件](./quickstart/prometheus-arch.md)
  * [小结](./quickstart/SUMMARY.md)
* [第2章 探索PromQL](./promql/README.md)
  * [理解时间序列](./promql/what-is-prometheus-metrics-and-labels.md)
  * [Metrics类型](./promql/prometheus-metrics-types.md)
  * [初识PromQL](./promql/prometheus-query-language.md)
  * [PromQL操作符](./promql/prometheus-promql-operators-v2.md)
  * [PromQL聚合操作](./promql/prometheus-aggr-ops.md)
  * [PromQL内置函数](./promql/prometheus-promql-functions.md)
  * [在HTTP API中使用PromQL](./promql/prometheus-promql-with-http-api.md)
  * [最佳实践：4个黄金指标和USE方法](./promql/prometheus-promql-best-praticase.md)
  * [小结](./promql/SUMMARY.md)
* [第3章 Prometheus告警处理](./alert/README.md)
  * [Prometheus告警简介](./alert/prometheus-alert-manager-overview.md)
  * [自定义Prometheus告警规则](./alert/prometheus-alert-rule.md)
  * [部署AlertManager](./alert/install-alert-manager.md)
  * [Alertmanager配置概述](./alert/alert-manager-config.md)
  * [基于标签的告警处理路由](./alert/alert-manager-route.md)
  * [使用Receiver接收告警信息](./alert/alert-manager-use-receiver.md)
    * [集成邮件系统](./alert/alert-with-smtp.md)
    * [集成Slack](./alert/alert-with-slack.md)
    * [集成企业微信](./alert/alert-with-wechat.md)
    * [集成钉钉：基于Webhook的扩展](./alert/alert-manager-extension-with-webhook.md)
  * [告警模板详解](./alert/alert-template.md)
  * [屏蔽告警通知](./alert/alert-manager-inhibit.md)
  * [使用Recoding Rules优化性能](./alert/prometheus-recoding-rules.md)
  * [小结](./alert/SUMMARY.md)

## Part II - Prometheus进阶

* [第4章 Exporter详解](./exporter/README.md)
  * [Exporter是什么](./exporter/what-is-prometheus-exporter.md)
  * [常用Exporter](./exporter/commonly-eporter-usage.md)
    * [容器监控：cAdvisor](./exporter/use-prometheus-monitor-container.md)
    * [监控MySQL运行状态：MySQLD Exporter](./exporter/use-promethues-monitor-mysql.md)
    * [网络探测：Blackbox Exporter](./exporter/install_blackbox_exporter.md)
  * [使用Java自定义Exporter](./exporter/custom_exporter_with_java.md)
    * [使用Client Java构建Exporter程序](./exporter/client_library_java.md)
    * [在应用中内置Prometheus支持](./exporter/custom_app_support_prometheus.md)
  * [小结](./exporter/SUMMARY.md)
* [第5章 数据与可视化](./grafana/README.md)
  * [使用Console Template](./grafana/use-console-template.md)
  * [Grafana的基本概念](./grafana/grafana-intro.md)
  * [Grafana与数据可视化](./grafana/grafana-panels.md)
    * [变化趋势：Graph面板](./grafana/use_graph_panel.md)
    * [分布统计：Heatmap面板](./grafana/use_heatmap_panel.md)
    * [当前状态：SingleStat面板](./grafana/use_singlestat_panel.md)
  * [模板化Dashboard](./grafana/templating.md)
  * [小结](./grafana/SUMMARY.md)
* [第6章 集群与高可用](./ha/READMD.md)
  * [本地存储](./ha/prometheus-local-storage.md)
  * [远程存储](./ha/prometheus-remote-storage.md)
  * [联邦集群](./ha/scale-prometheus-with-federation.md)
  * [Prometheus高可用](./ha/prometheus-and-high-availability.md)
  * [Alertmanager高可用](./ha/alertmanager-high-availability.md)
  * [小结](./ha/SUMMARY.md)
* [第7章 Prometheus服务发现](./sd/README.md)
  * [Prometheus与服务发现](./sd/why-need-service-discovery.md)
  * [基于文件的服务发现](./sd/service-discovery-with-file.md)
  * [基于Consul的服务发现](./sd/service-discovery-with-consul.md)
  * [服务发现与Relabel](./sd/service-discovery-with-relabel.md)
  * [小结](./sd/SUMMARY.md)

## Part III - Prometheus实战

* [第8章 监控Kubernetes](./kubernetes/READMD.md)
  * [初识Kubernetes](./kubernetes/kubernetes-with-minikube.md)
  * [部署Prometheus](./kubernetes/deploy-prometheus-in-kubernetes.md)
  * [Kubernetes下的服务发现](./kubernetes/service-discovery-with-kubernetes.md)
  * [监控Kubernetes集群](./kubernetes/use-prometheus-monitor-kubernetes.md)
  * [基于Prometheus的弹性伸缩](./kubernetes/hap-with-prometheus.md)
  * [小结](./kubernetes/SUMMARY.md)
* [第9章 Prometheus Operator](./operator/README.md)
  * [什么是Prometheus Operator](./operator/what-is-prometheus-operator.md)
  * [使用Operator管理Prometheus](./operator/use-operator-manage-prometheus.md)
  * [使用Operator管理监控配置](./operator/use-operator-manage-monitor.md)
  * [在Prometheus Operator中使用自定义配置](./operator/use-custom-configuration-in-operator.md)
  * [小结](./operator/SUMMARY.md)
* [参考资料](./REFERENCES.md)
