import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
     DayjsDateProvider
)

container.registerInstance<IMailProvider>( // this case EtherealMailProvider, is become with a 
    "EtherealMailProvider",                // instance, and only one
    new EtherealMailProvider()
);
