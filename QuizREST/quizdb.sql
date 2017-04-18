use quizdb;

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (10,'States');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,10,'What is the smallest state in the US'),(2,10,'What is the Colorado state bird?'),(3,10,'What is the capital of Colorado?'),(4,10,'What is the Colorado state bird?'),(5,10,'What is the official state dance of Colorado?');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (1,1,'Deleware',0),(2,1,'Rhode Island',1),(3,1,'Texas',0),(4,1,'Maine',0),(5,2,'Lark bunting',1),(6,2,'Northern mockingbird',0),(7,2,'Brown pelican',0),(8,2,'Willow ptarmigan',0),(9,3,'Vail',0),(10,3,'Denver',1),(11,3,'Aspen',0),(12,3,'Parker',0),(13,4,'Carnation',0),(14,4,'Rocky Mountain Columbine',1),(15,4,'Rhododendron',0),(16,4,'Saguaro',0),(17,5,'Clogging',0),(18,5,'State Dance',1),(19,5,'Lindy Hop',0),(20,5,'Two step',0);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;
