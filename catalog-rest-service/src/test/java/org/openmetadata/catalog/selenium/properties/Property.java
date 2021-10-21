/*
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements. See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License. You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package org.openmetadata.catalog.selenium.properties;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class Property {

    private static String PATH;
    private static Integer waitTime;
    private static String URL;
    private static final Object LOCK = new Object();
    private static Property instance;
    String pathToOpenMetadata = "pathToOpenMetadata";
    String openMetadataUrl = "openMetadataUrl";
    String openMetadataWaitTime = "waitTime";

    public static Property getInstance() {
        if (instance == null) {
            synchronized (LOCK) {
                instance = new Property();
                instance.loadData();
            }
        }
        return instance;
    }

    private void loadData() {
        Properties properties = new Properties();
        try {
            properties.load(new FileInputStream("selenium.properties"));
        } catch (IOException e) {
            return;
        }
        PATH = properties.getProperty(pathToOpenMetadata);
        URL = properties.getProperty(openMetadataUrl);
        waitTime = Integer.parseInt(properties.getProperty(openMetadataWaitTime));
    }

    public static String getPath() {
        return PATH;
    }

    public static String getURL() {
        return URL;
    }

    public static Integer getSleepTime() {
        return waitTime;
    }
}
