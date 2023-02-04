FROM docker:stable
RUN apk -v --update add \
        python2 \
        py-pip \
        groff \
        less \
        mailcap \
        aws-cli \
        && \
    pip install --upgrade awscli s3cmd python-magic && \
    apk -v --purge del py-pip && \
    rm /var/cache/apk/*

COPY scripts/redeploy-service.sh /bin/redeploy-service
COPY scripts/db-migrate.sh /bin/db-migrate
RUN chmod a+x /bin/redeploy-service
RUN chmod a+x /bin/db-migrate
