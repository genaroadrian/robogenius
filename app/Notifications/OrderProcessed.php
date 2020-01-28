<?php

namespace slidecom_robogenius\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use slidecom_robogenius\Channels\Messages\WhatsAppMessage;
use slidecom_robogenius\Channels\WhatsAppChannel;


class OrderProcessed extends Notification
{
  use Queueable;


  public $order;
  
  public function __construct($order)
  {
    $this->order = $order;
  }
  
  public function via($notifiable)
  {
    return [WhatsAppChannel::class];
  }
  
  public function toWhatsApp($notifiable)
  {
    $orderUrl = "robogenius.mx";
    $company = 'ROBOGENIUS';
    $deliveryDate = "$499";


    return (new WhatsAppMessage)
        ->content("La compañia {$company} le manda saludos por su compra de {$deliveryDate} Puede obtener informacion en {$orderUrl} NO RESPONDER ESTE MENSAJE");
  }
}
