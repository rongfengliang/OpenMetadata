# Create Server Credentials

**This document is all about how to create an Okta app and configure it for oAuth. It will generate information that is required to perform the single-sign-on activity.**

## Step 1: Create an Okta Account

* Go to [Create Okta Account](https://developer.okta.com/signup/).
* Provide the required input and click on **Sign Up**.
* Else you can **continue with Google or GitHub**.

## Step 2: Create the OIDC app integration.

* Once done with **signup/signin** you will be redirected to the **getting started** page of okta.

![Alt text](https://user-images.githubusercontent.com/83201188/123376300-e600d100-d5a7-11eb-8ceb-e90b5e265ce9.png)

* Click **Applications -> Applications** available on the left side of the panel.

![Alt text](https://user-images.githubusercontent.com/83201188/123376308-e7ca9480-d5a7-11eb-84f8-9d8dce921c68.png)

* Click on **Create App Integration** button.

![Alt text](https://user-images.githubusercontent.com/83201188/123376309-e8632b00-d5a7-11eb-8d5c-34c5f981786c.png)

## Step 3: Configuring the app

* Once you click on **Create App Integration** button.
* Select **OIDC - OpenID Connect**.

![Alt text](https://user-images.githubusercontent.com/83201188/123376312-e8fbc180-d5a7-11eb-882f-a9083cb0ea87.png)

* Then select the **Application type**. Select **Web Application**.

![Alt text](https://user-images.githubusercontent.com/83201188/123376314-e9945800-d5a7-11eb-866b-5af5ca003f1e.png)

* Once selected, click **Next**.
* Select **Refresh token**, **Implicit(Hybrid)**. Once selected Implicit option, select **Allow ID token with implicit grant type**. In Refresh token behavior. Select **Use persistent token**. Provide the necessary input and click **Save**.

![](../../../../.gitbook/assets/screenshot-from-2021-09-20-14-14-14.png)

* The app is now configured.

![](<../../../../.gitbook/assets/screenshot-from-2021-09-20-14-11-53 (1).png>)

## Step 4: Where to find the credentials

* Once the app is configured, now the **Client Id** and **Client secret** can be used.
* You can also go to **Application -> Application** like in step 2.
* You should be able to see your application in the list.

![Alt text](https://user-images.githubusercontent.com/83201188/123376803-b605fd80-d5a8-11eb-94ce-42f38dca99a1.png)

* Click on your application.
* You will find your **Client id**, **Client secret,** and **Okta domain**.

![](../../../../.gitbook/assets/screenshot-from-2021-09-20-14-59-07.png)

* To get your **issuer** and **audience** click on **Sign On** available on top of the form.

![Alt text](https://user-images.githubusercontent.com/83201188/123376802-b56d6700-d5a8-11eb-89b3-a59b3192fce6.png)

## Step 5: Adding the details in openmetadata-security.yaml

*   Once the **Client Id**, **Client secret**, **issuer,** and **audience** are generated.

    Add those details in the openmetadata-security.yaml file in the respective field.

![Alt text](https://user-images.githubusercontent.com/83201188/123380400-054e2d00-d5ad-11eb-9937-2813f69cb268.png)
