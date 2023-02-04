#!/bin/sh
clusterName=`aws ecs list-clusters --output text | grep cluster\/$AWS_CLUSTER_NAME | awk '{ split($2,a, "/"); print a[2] }'`
echo clusterName=$clusterName
serviceName=`aws ecs list-services --cluster $clusterName --output text | grep $AWS_SERVICE_NAME | awk '{ split($2,a, "/"); print a[2] }'`
echo serviceName=$serviceName
taskIds=`aws ecs list-tasks --cluster $clusterName --service $serviceName --output text | cut -f 2`
echo taskIds=$taskIds;
if [[ ! -z "$taskIds" ]]; then
    for taskId in "$taskIds"; do
        echo Stopping task $taskId;
        aws ecs stop-task --cluster $clusterName --reason "Deploy new version" --task $taskId;
        done;
fi;
aws ecs update-service --force-new-deployment --cluster $clusterName --service $serviceName
