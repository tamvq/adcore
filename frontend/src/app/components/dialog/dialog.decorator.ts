import { ConfirmDialog } from '../../interface/dialog';
import { DialogService } from '../../services/dialog.service';
import { DialogComponent } from './dialog.component';

const defaultConfirmData: ConfirmDialog = {
  title: 'Confirmation',
  message: 'Are you sure you want to perform this action?',
};

export const needConfirmation = (
  confirmData: ConfirmDialog = defaultConfirmData
) => {
  return function (
    _target: Object,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any) {
      DialogService.getInstance()
        ?.openDialog(confirmData, DialogComponent)
        .subscribe((validation) => {
          if (validation) {
            originalMethod.apply(this, args);
          }
        });
    };

    return descriptor;
  };
};
