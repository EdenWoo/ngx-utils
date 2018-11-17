import {Project} from '../models/project.model';

export class ProjectConstants {
  public static constants: Project[] = [
    new Project('Moc Coffee Production', 'http://api.ccfxtrader.com/'),
    new Project('Moc Coffee Test', 'http://testapi.ccfxtrader.com/'),
    new Project('Moc Coffee Local', 'http://localhost:9999/'),
    new Project('Moc Coffee Leon Ip', 'http://172.31.11.236:9999/'),
    new Project('Ecommerce Local', 'http://localhost:2020/'),
    new Project('Ecommerce Production', 'http://api.gooodquality.com/')
  ];
  public static CurrentProjectUrl = 'current-project-url';

}
