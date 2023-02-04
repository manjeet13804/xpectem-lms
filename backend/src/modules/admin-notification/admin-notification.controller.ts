import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUseTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import {
  NotificationsCreateDto,
  SearchAdminNotificationsDto,
  AdminNotificationDateRangeDto,
  AdminNotificationDto,
  AllNotificationsDto,
} from './dto/admin-notification.dto';
import { NotificationGateway } from '../notification/notification.gateway';
import { AdminNotificationService } from './admin-notification.service'
import { AdminNotificationTriggersService } from './admin-notification-triggers.service';
import { AutomaticReminderNotification } from "../../entity/AutomaticReminderNotifications";
import {
  createNotificationValidation,
  adminNotificationValidation,
} from "./schemas/admin-notification-schemas";
import {
  AutomaticReminderNotificationDto,
  AutomaticReminderNotificationEnableDto,
} from "./dto/automatic-reminder.dto";
import {
  AdminNotificationTriggerDto,
  AdminNotificationTriggersResponseDto,
} from "./dto/trigger-notification.dto";
import {
  automaticReminderNotificationValidation,
  automaticReminderEnableValidation,
} from "./schemas/automatic-reminder-schemas";
import {
  getTriggersValidation,
  adminNotificationTriggerValidation,
} from "./schemas/trigger-notification.schemas";
import { NotificationTriggers } from "./entity/notification-triggers.entity";

@ApiBearerAuth()
@ApiUseTags('admin notifications')
@Controller('admin-notifications')
export class AdminNotificationController {
  public constructor(
    private readonly notificationGateway: NotificationGateway,
    private readonly adminNotificationService: AdminNotificationService,
    private readonly adminNotificationTriggersService: AdminNotificationTriggersService,
  ) {}

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create new automatic reminder notifications for students' })
  @ApiOkResponse({
    description: 'Return a list of categories',
  })
  @UsePipes(new JoiValidationPipe(adminNotificationValidation))
  public async getNotifications(
    @Query() query: AdminNotificationDto,
  ): Promise<{total: number, notifications: AllNotificationsDto[]}> {

    return this.adminNotificationService.getNotifications(query);
  }

  @Post('create')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create new notifications for students' })
  @ApiCreatedResponse({
    description: 'Notifications created.',
  })
  @UsePipes(new JoiValidationPipe(createNotificationValidation))
  public async sendAdminNotification(
    @Body() body: NotificationsCreateDto,
    @Req() { user },
  ) {
    return this.adminNotificationService.createNotification(body, user);
  }

  @Get('automatic-reminders')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create new automatic reminder notifications for students' })
  @ApiOkResponse({
    description: 'Return a list of categories',
    type: SearchAdminNotificationsDto,
  })
  public async getReminderNotification(
    @Query() query: SearchAdminNotificationsDto,
  ): Promise<AutomaticReminderNotification[]> {
    return this.adminNotificationService.getReminderNotification(query.lmsGroupId);
  }

  @Get('automatic-reminder/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create new automatic reminder notifications for students' })
  @ApiOkResponse({
    description: 'Return a list of categories',
    type: SearchAdminNotificationsDto,
  })
  public async getAutomaticReminder(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() { user },
  ): Promise<AutomaticReminderNotification> {
    return this.adminNotificationService.getAutomaticReminder(id);
  }

  @Post('automatic-reminders')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create new automatic reminder notifications for students' })
  @ApiCreatedResponse({
    description: 'Automatic reminder notifications created.',
  })
  @UsePipes(new JoiValidationPipe(automaticReminderNotificationValidation))
  public async sendReminderNotification(
    @Body() body: AutomaticReminderNotificationDto,
    @Req() { user },
  )  {
    return this.adminNotificationService.sendReminderNotification(body);
  }

  @Put('automatic-reminders/enable')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create new automatic reminder notifications for students' })
  @ApiCreatedResponse({
    description: 'Automatic reminder notifications created.',
  })
  @UsePipes(new JoiValidationPipe(automaticReminderEnableValidation))
  public async enableReminderNotification(
    @Body() body: AutomaticReminderNotificationEnableDto,
    @Req() { user },
  )  {
    return this.adminNotificationService.enableReminderNotification(body);
  }

  @Put('automatic-reminders/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create new automatic reminder notifications for students' })
  @ApiCreatedResponse({
    description: 'Automatic reminder notifications created.',
  })
  @UsePipes(new JoiValidationPipe(automaticReminderNotificationValidation))
  public async updateReminderNotification(
    @Body() body: AutomaticReminderNotificationDto,
    @Param('id', new ParseIntPipe()) id: number,
    @Req() { user },
  )  {
    return this.adminNotificationService.updateReminderNotification(body, id);
  }

  @Delete('automatic-reminders/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create new automatic reminder notifications for students' })
  @ApiCreatedResponse({
    description: 'Automatic reminder notifications created.',
  })
  public async deleteReminderNotification(
    @Param('id', new ParseIntPipe()) id: number,
    @Req() { user },
  )  {
    return this.adminNotificationService.deleteReminderNotification(id);
  }

  @Get('users')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Create new automatic reminder notifications for students' })
  @ApiOkResponse({
    description: 'Return a list of categories',
  })
  public async getUsers(
    @Query() query: any,
  ) {
    return this.adminNotificationService.getUser(query);
  }

  @Post('triggers')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'admin-student',
  })
  @UsePipes(new JoiValidationPipe(adminNotificationTriggerValidation))
  @ApiOperation({ title: 'Set trigger for notification sending' })
  @ApiOkResponse({
    type: [NotificationTriggers],
  })
  @ApiCreatedResponse({description: 'Trigger created'})
  public async createTrigger(
    @Body() body: AdminNotificationTriggerDto,
    @Req() { user },
  ): Promise<NotificationTriggers> {
    return this.adminNotificationTriggersService.createTrigger(user, body);
  }

  @Get('triggers')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Get notification triggers' })
  @ApiOkResponse({ type: AdminNotificationTriggersResponseDto, isArray: true })
  @UsePipes(new JoiValidationPipe(getTriggersValidation))
  public async getTriggers(
    @Req() { user },
    @Query() query: AdminNotificationDateRangeDto,
  ) {
    return this.adminNotificationTriggersService.get();
  }
}
