/*
  * Licensed to the Apache Software Foundation (ASF) under one or more
  * contributor license agreements. See the NOTICE file distributed with
  * this work for additional information regarding copyright ownership.
  * The ASF licenses this file to You under the Apache License, Version 2.0
  * (the "License"); you may not use this file except in compliance with
  * the License. You may obtain a copy of the License at

  * http://www.apache.org/licenses/LICENSE-2.0

  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
*/

import { AxiosResponse } from 'axios';
import { UserProfile } from 'Models';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import appState from '../../AppState';
import { createUser, getTeams } from '../../axiosAPIs/userAPI';
import { Button } from '../../components/buttons/Button/Button';
import PageContainer from '../../components/containers/PageContainer';
import DropDown from '../../components/dropdown/DropDown';
import { imageTypes, ROUTES } from '../../constants/constants';
import { getNameFromEmail } from '../../utils/AuthProvider.util';
import SVGIcons, { Icons } from '../../utils/SvgUtils';
import { fetchAllUsers } from '../../utils/UsedDataUtils';
type Team = {
  id: string;
  displayName: string;
};
const getImages = (imageUri: string) => {
  const imagesObj: typeof imageTypes = imageTypes;
  for (const type in imageTypes) {
    imagesObj[type as keyof typeof imageTypes] = imageUri.replace(
      's96-c',
      imageTypes[type as keyof typeof imageTypes]
    );
  }

  return imagesObj;
};

const Signup = () => {
  const [selectedTeams, setSelectedTeams] = useState<Array<string | undefined>>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [details, setDetails] = useState({
    displayName: appState.newUser.name || '',
    name: getNameFromEmail(appState.newUser.email),
    email: appState.newUser.email || '',
  });
  const [teams, setTeams] = useState<Array<Team>>([]);

  const history = useHistory();

  const selectedTeamsHandler = (id?: string) => {
    setSelectedTeams((prevState: Array<string | undefined>) => {
      if (prevState.includes(id as string)) {
        const selectedTeam = [...prevState];
        const index = selectedTeam.indexOf(id as string);
        selectedTeam.splice(index, 1);

        return selectedTeam;
      } else {
        return [...prevState, id];
      }
    });
  };
  const createNewUser = (details: {
    [name: string]: string | Array<string> | UserProfile;
  }) => {
    setLoading(true);
    createUser(details).then((res) => {
      if (res.data) {
        setLoading(false);
        appState.userDetails = res.data;
        fetchAllUsers();
        history.push(ROUTES.HOME);
      } else {
        setLoading(false);
      }
    });
  };

  const onChangeHadler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setDetails((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (details.name && details.displayName) {
      createNewUser({
        ...details,
        teams: selectedTeams as Array<string>,
        profile: {
          images: getImages(appState.newUser.picture ?? ''),
        },
      });
    }
  };

  const getTeamsData = (teams: Array<Team>) => {
    return teams.map((team: Team) => {
      return {
        name: team.displayName,
        value: team.id,
      };
    });
  };

  useEffect(() => {
    getTeams().then((res: AxiosResponse) => {
      setTeams(res?.data?.data || []);
    });
  }, []);

  return (
    <>
      {!loading && (
        <PageContainer>
          <div className="tw-w-screen tw-h-screen tw-flex tw-justify-center">
            <div className="tw-flex tw-flex-col tw-items-center signup-box">
              <div className="tw-flex tw-justify-center tw-items-center tw-my-7">
                <SVGIcons
                  alt="OpenMetadata Logo"
                  icon={Icons.LOGO_SMALL}
                  width="50"
                />
              </div>
              <div className="tw-mb-7">
                <h4 className="tw-font-semibold">
                  Join <span className="tw-text-primary">OpenMetadata</span>
                </h4>
              </div>
              <div className="tw-px-8 tw-w-full">
                <form action="." method="POST" onSubmit={onSubmitHandler}>
                  <div className="tw-mb-4">
                    <label
                      className="tw-block tw-text-body tw-text-grey-body tw-mb-2"
                      htmlFor="displayName">
                      Full name
                    </label>
                    <input
                      required
                      autoComplete="off"
                      className="tw-appearance-none tw-border tw-border-main  
                tw-rounded tw-w-full tw-py-2 tw-px-3 tw-text-grey-body  tw-leading-tight 
                focus:tw-outline-none focus:tw-border-focus hover:tw-border-hover tw-h-10"
                      id="displayName"
                      name="displayName"
                      placeholder="Your Full name"
                      type="text"
                      value={details.displayName}
                      onChange={onChangeHadler}
                    />
                  </div>
                  <div className="tw-mb-4">
                    <label
                      className="tw-block tw-text-body tw-text-grey-body tw-mb-2"
                      htmlFor="name">
                      Username
                    </label>
                    <input
                      readOnly
                      required
                      autoComplete="off"
                      className="tw-cursor-not-allowed tw-appearance-none tw-border tw-border-main tw-rounded tw-bg-gray-100
                    tw-w-full tw-py-2 tw-px-3 tw-text-grey-body tw-leading-tight focus:tw-outline-none focus:tw-border-focus hover:tw-border-hover tw-h-10"
                      id="name"
                      name="name"
                      placeholder="Username"
                      type="text"
                      value={details.name}
                      onChange={onChangeHadler}
                    />
                  </div>
                  <div className="tw-mb-4">
                    <label
                      className="tw-block tw-text-body tw-text-grey-body tw-mb-2"
                      htmlFor="email">
                      Email
                    </label>
                    <input
                      readOnly
                      required
                      autoComplete="off"
                      className="tw-cursor-not-allowed tw-appearance-none tw-border tw-border-main tw-rounded tw-bg-gray-100
                    tw-w-full tw-py-2 tw-px-3 tw-text-grey-body tw-leading-tight focus:tw-outline-none focus:tw-border-focus hover:tw-border-hover tw-h-10"
                      id="email"
                      name="email"
                      placeholder="Your email address"
                      type="email"
                      value={details.email}
                      onChange={onChangeHadler}
                    />
                  </div>
                  <div className="tw-mb-4">
                    <label
                      className="tw-block tw-text-body tw-text-grey-body tw-mb-2"
                      htmlFor="email">
                      Select teams
                    </label>
                    <DropDown
                      className="tw-bg-white"
                      dropDownList={getTeamsData(teams)}
                      label="Select..."
                      selectedItems={selectedTeams as Array<string>}
                      type="checkbox"
                      onSelect={(_e, value) => selectedTeamsHandler(value)}
                    />
                  </div>
                  <div className="tw-flex tw-my-7 tw-justify-end">
                    <Button
                      className="tw-text-white 
                       tw-text-sm tw-py-2 tw-px-4 tw-font-semibold tw-rounded tw-h-10 tw-justify-self-end"
                      size="regular"
                      theme="primary"
                      type="submit"
                      variant="contained">
                      Create
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </PageContainer>
      )}
      {loading && (
        <p className="tw-text-center tw-text-grey-body tw-h3 tw-flex tw-justify-center tw-items-center">
          Creating Account ....
        </p>
      )}
    </>
  );
};

export default Signup;
