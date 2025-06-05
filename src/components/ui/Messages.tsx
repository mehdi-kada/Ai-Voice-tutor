import {
  getSubjectColor,
  getSubjectColorDark,
  getSubjectLightColor,
} from "@/lib/utils";
import React from "react";

function Messages({
  messages,
  subject,
  name,
  userName,
}: {
  messages: SavedMessage[];
  subject: string;
  name: string;
  userName: string;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
        <h1 className="text-xl font-semibold text-gray-700 px-4">
          Conversation
        </h1>
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent flex-1"></div>
      </div>

      <section className="flex justify-between gap-8 max-h-64 overflow-hidden">
        {/* Assistant Messages */}
        <div className="flex-1 relative">
          {messages.filter((m) => m.role === "assistant").length > 0 && (
            <div className="message-group">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getSubjectLightColor(subject) }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: getSubjectColorDark(subject) }}
                  >
                    AI
                  </span>
                </div>
                <h2
                  className="text-lg font-semibold"
                  style={{ color: getSubjectColorDark(subject) }}
                >
                  {name}
                </h2>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                {messages
                  .filter((m) => m.role === "assistant")
                  .map((m, index) => (
                    <div
                      key={`assistant-${index}`}
                      className="p-3 rounded-lg border-l-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                      style={{
                        backgroundColor: getSubjectLightColor(subject),
                        borderColor: getSubjectColor(subject),
                      }}
                    >
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: getSubjectColorDark(subject) }}
                      >
                        {m.content}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Fade effect at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
          )}
        </div>
        {/* User Messages */}
        <div className="flex-1 relative">
          {messages.filter((m) => m.role === "user").length > 0 && (
            <div className="message-group">
              <div className="flex items-center gap-2 mb-3 justify-end">
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "#D97706" }}
                >
                  {userName}
                </h2>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#FFF2B8" }}
                >
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#D97706" }}
                  >
                    U
                  </span>
                </div>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                {messages
                  .filter((m) => m.role === "user")
                  .map((m, index) => (
                    <div
                      key={`user-${index}`}
                      className="message message-user p-3 rounded-lg border-r-4 shadow-sm hover:shadow-md transition-shadow duration-200 ml-auto max-w-[90%]"
                      style={{
                        backgroundColor: "#FFF2B8",
                        borderColor: "#fccc41",
                      }}
                    >
                      <p
                        className="text-sm leading-relaxed text-right"
                        style={{ color: "#D97706" }}
                      >
                        {m.content}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Fade effect at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
          )}
        </div>
      </section>

      {/* Other Messages (fallback) */}
      {messages.filter((m) => m.role !== "assistant" && m.role !== "user")
        .length > 0 && (
        <div className="mt-6 relative">
          <div className="message-group">
            <h2 className="text-lg font-semibold mb-3 text-gray-600">
              System Messages
            </h2>
            <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
              {messages
                .filter((m) => m.role !== "assistant" && m.role !== "user")
                .map((m, index) => (
                  <div
                    key={`other-${index}`}
                    className={`message message-${m.role} p-2 bg-gray-50 rounded border-l-2 border-gray-300 shadow-sm`}
                  >
                    <h3 className="font-semibold text-xs text-gray-500 uppercase">
                      {m.role}
                    </h3>
                    <p className="text-sm text-gray-700">{m.content}</p>
                  </div>
                ))}
            </div>
            {/* Fade effect at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;
