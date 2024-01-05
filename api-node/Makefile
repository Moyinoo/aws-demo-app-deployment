API_NODE_PATH:=C:\Users\johng\OneDrive\Desktop\aws-push\api-node
DOCKERHUB_REPO:=029323888691.dkr.ecr.us-east-1.amazonaws.com/demo

N?=8
.PHONY: build-N
build-N:
	docker build --file ./Dockerfile.${N} \
		-t api-node:${N} \
		-t ${DOCKERHUB_REPO}:${N} \
		${API_NODE_PATH}

.PHONY: build-all
build-all:
	for number in 0 1 2 3 4 5 6 7 8; do \
			N=$$number $(MAKE) build-N; \
	done

.PHONY: push-N
push-N:
	docker push ${DOCKERHUB_REPO}:${N}

.PHONY: push-all
push-all:
	for number in 0 1 2 3 4 5 6 7 8; do \
			N=$$number $(MAKE) push-N; \
	done



	06-building-container-images\api-node\Makefile
	06-building-container-images/api-node/Makefile
	05-example-web-application
	C:\Users\johng\OneDrive\Desktop\devops-directive-docker-course-1\05-example-web-application