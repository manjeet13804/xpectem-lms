#!/bin/sh
clusterName=`aws ecs list-clusters --output text | grep cluster\/$AWS_CLUSTER_NAME | awk '{ split($2,a, "/"); print a[2] }'`
echo clusterName=$clusterName
aws ecs run-task --cluster $clusterName --task-definition DBMigrateTask;