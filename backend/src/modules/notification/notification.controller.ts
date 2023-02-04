import { Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { ACGuard, UseRoles } from 'nest-access-control';
import { NotificationService } from './notification.service';

@Controller('notification')
@ApiUseTags('notification')
export class NotificationController {

  constructor(private notificationService: NotificationService) { }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'notification',
  })
  @ApiOperation({ title: 'Get notification' })
  @ApiResponse({
    description: 'Notification',
    status: HttpStatus.OK,
  })
  public async getNotification(
    @Req() requestData,
  ) {
    const { user: { id } } = requestData;

    return this.notificationService.getNotification(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'delete',
    possession: 'any',
    resource: 'notification',
  })
  @ApiOperation({ title: 'Delete notification' })
  @ApiResponse({
    description: 'Notification',
    status: HttpStatus.OK,
  })
  public async deleteNotification(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() { user },
  ) {
    return this.notificationService.deleteNotification(user.id, id);
  }

}
