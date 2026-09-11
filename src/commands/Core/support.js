import { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, MessageFlags } from 'discord.js';
import { createEmbed } from '../../utils/embeds.js';
import { logger } from '../../utils/logger.js';
import { InteractionHelper } from '../../utils/interactionHelper.js';

// 1. غيّر الرابط هنا ليكون رابط سيرفرك الخاص
const SUPPORT_SERVER_URL = "https://discord.gg/YOUR_INVITE_LINK"; 

export default {
  data: new SlashCommandBuilder()
    .setName("support") // 
    .setDescription("Get link to the official support server"),

  async execute(interaction) {
    try {
      const supportButton = new ButtonBuilder()
        .setLabel("𝐃𝐙  𝐓𝐎𝐏  | 𝐌𝐎𝐃𝐒  5𝐊") // النص الظاهر على الزر
        .setStyle(ButtonStyle.Link)
        .setURL(SUPPORT_SERVER_URL);

      const actionRow = new ActionRowBuilder().addComponents(supportButton);

      await InteractionHelper.safeReply(interaction, {
        embeds: [
          createEmbed({ 
            title: "Need Help?", 
            description: "Join our official support server for assistance, report bugs, or suggest features." 
          }),
        ],
        components: [actionRow],
        flags: MessageFlags.Ephemeral,
      });
    } catch (error) {
      logger.error('Support command error:', error);
      
      try {
        return await InteractionHelper.safeReply(interaction, {
          embeds: [createEmbed({ title: 'System Error', description: 'Could not display support information.', color: 'error' })],
          flags: MessageFlags.Ephemeral,
        });
      } catch (replyError) {
        logger.error('Failed to send error reply:', replyError);
      }
    }
  }
};
