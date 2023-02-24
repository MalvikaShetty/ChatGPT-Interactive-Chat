using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ChatGPTCoreWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class typechangeofarr : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_messages_chatmessages_ChatMessagesChatMessageId",
                table: "messages");

            migrationBuilder.DropIndex(
                name: "IX_messages_ChatMessagesChatMessageId",
                table: "messages");

            migrationBuilder.DropColumn(
                name: "ChatMessagesChatMessageId",
                table: "messages");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ChatMessagesChatMessageId",
                table: "messages",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_messages_ChatMessagesChatMessageId",
                table: "messages",
                column: "ChatMessagesChatMessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_messages_chatmessages_ChatMessagesChatMessageId",
                table: "messages",
                column: "ChatMessagesChatMessageId",
                principalTable: "chatmessages",
                principalColumn: "ChatMessageId");
        }
    }
}
