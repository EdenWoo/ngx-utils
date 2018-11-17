import {environment} from '../../environments/environment';

export class Constants {
  public static CurrentUser = 'admin-current-user';
  public static CurrentUserInfo = 'admin-current-user-detail';
  public static CurrentUserPermissions = 'admin-current-user-permission';
  public static API_ENDPOINT = environment.apiUrl;
  public static PERMISSION_CHANGE = 'admin-current-user-permission-changed';
  public static FormTypeConstants: any = {
    normalAdd: 'normal-add-form',
    normalEdit: 'normal-edit-form',
    treeAdd: 'tree-add-form',
    treeEdit: 'tree-edit-form'
  };

  public static USER: any = {
    broker: 'BROKER',
    individual: 'INDIVIDUAL',
    company: 'COMPANY',
    backend: 'BACKEND',
    nonBackend: 'NONBACKEND'
  };
  static ClientId = environment.clientId;

}
