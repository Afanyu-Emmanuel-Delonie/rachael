"use client";

import { useState } from "react";

const SECTIONS = [
  {
    label: "Starters",
    sub: "Morning vibes",
    dishes: [
      { id: 1,  emoji: "👑", title: "Wake up like queen",       desc: "Stretch slow. Check phone. 99+ messages. Na normal, you be celebrity today.",                          price: "Free" },
      { id: 2,  emoji: "📞", title: "Call all your smallies",   desc: "One by one. Make each of dem sing Happy Birthday for phone, even if dem voice spoil.",                price: "Your call credit" },
      { id: 3,  emoji: "🥣", title: "Soak garri special",       desc: "Garri, sugar, groundnut, cold water. Chop am like say na jollof for wedding.",                        price: "100 frs" },
    ],
  },
  {
    label: "Main Dish",
    sub: "Afternoon wahala",
    dishes: [
      { id: 4,  emoji: "🎤", title: "Sing your song LOUD",      desc: "If neighbour complain, tell dem say na birthday. Case close.",                                         price: "Your voice" },
      { id: 5,  emoji: "💃🏾", title: "Dance like nobody dey look", desc: "Everybody dey look. Na your day, e no matter.",                                                    price: "One waist" },
      { id: 6,  emoji: "📲", title: "Call Biggie",              desc: "Tell am say you don grow. Hear wetin e go talk. Record am if you fit.",                                price: "Priceless" },
      { id: 7,  emoji: "🤳🏾", title: "Selfie wahala",           desc: "Snap 20 selfies. Post only one. Na the law.",                                                          price: "Phone storage" },
      { id: 8,  emoji: "📢", title: "Remind everybody",         desc: "Every 30 minutes, tell somebody say na your birthday. Dem must hear.",                                 price: "Free" },
    ],
  },
  {
    label: "Drinks",
    sub: "All day",
    dishes: [
      { id: 9,  emoji: "🥤", title: "Cold drink for every \"Mommy\"", desc: "Each time somebody call you Mommy today, one cold drink. Hafsatou alone go finish the crate.", price: "Their money" },
      { id: 10, emoji: "💧", title: "Water too, abeg",           desc: "Hydrate, birthday girl. Kili no go carry water for you today.",                                       price: "Free" },
    ],
  },
  {
    label: "Dessert",
    sub: "Night, bring tissue",
    dishes: [
      { id: 11, emoji: "💌", title: "Read every wish, slowly",  desc: "Go to Wishes. Read every one. No skip.",                                                               price: "Your heart" },
      { id: 12, emoji: "✉️", title: "Open \"For You\" last",    desc: "Na the last dish. Sit down first.",                                                                    price: "Tissue" },
      { id: 13, emoji: "🥲", title: "Cry small",                desc: "E dey allowed today. Nobody go laugh you. (We go laugh small.)",                                       price: "Free" },
      { id: 14, emoji: "❤️", title: "Remember this one",        desc: "Plenty people love you pass as you think.",                                                            price: "Forever" },
    ],
  },
];

const TOTAL = 14;

export default function MenuSection() {
  const [ticked, setTicked] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setTicked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const done = ticked.size;
  const allDone = done === TOTAL;

  return (
    <section id="menu" className="mx-auto max-w-2xl px-6 py-20 sm:px-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="font-letter text-lg text-blue-soft">Chef Smallie presents...</p>
        <h2 className="mt-1 text-4xl font-extrabold tracking-tight text-text">
          Rachael&apos;s Birthday Menu
        </h2>
        <p className="mt-2 text-sm text-muted">
          Order everything. Tick am when you finish chop 😂
        </p>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-2 text-sm font-medium text-blue-soft">
            {allDone
              ? "You don chop everything! Best birthday ever 🎉"
              : `${done} of ${TOTAL} dishes finished`}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-pill bg-white/[0.07]">
            <div
              className="h-full rounded-pill bg-blue transition-all duration-500"
              style={{ width: `${(done / TOTAL) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {SECTIONS.map((section) => (
          <div key={section.label}>
            {/* Section label */}
            <div className="mb-4 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                {section.label} — {section.sub}
              </span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            {/* Dishes */}
            <div className="space-y-3">
              {section.dishes.map((dish) => {
                const checked = ticked.has(dish.id);
                return (
                  <div key={dish.id}>
                    <button
                      onClick={() => toggle(dish.id)}
                      className={`group w-full rounded-card border px-5 py-4 text-left transition-all duration-200 ${
                        checked
                          ? "border-blue/40 bg-blue/10"
                          : "border-white/[0.06] bg-card hover:border-white/10 hover:bg-white/[0.09]"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Checkbox */}
                        <div
                          className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 transition-colors ${
                            checked ? "border-blue bg-blue" : "border-white/20"
                          }`}
                        >
                          {checked && (
                            <svg viewBox="0 0 10 8" className="h-3 w-3 text-white" fill="none">
                              <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className={`font-semibold text-text ${checked ? "line-through opacity-50" : ""}`}>
                              {dish.emoji} {dish.id}. {dish.title}
                            </span>
                            <span className="flex-none text-xs text-muted">{dish.price}</span>
                          </div>
                          <p className={`mt-1 text-sm leading-6 text-muted ${checked ? "opacity-40" : ""}`}>
                            {dish.desc}
                          </p>
                        </div>
                      </div>
                    </button>

                    {/* Call list — expands below dish 2 when ticked */}
                    {dish.id === 2 && checked && (
                      <div className="mt-2 rounded-card border border-blue/30 bg-blue/5 px-5 py-5 text-sm leading-7 text-muted">
                        <p className="font-letter text-base text-blue-soft">📞 The Official Call List</p>
                        <p className="mt-3">No skip. No "I go call later". Do am now. 😭</p>

                        <ol className="mt-3 space-y-4">
                          <li>
                            <span className="font-semibold text-text">1. Akayi</span><br />
                            Tell her one of the craziest things you ever did for love. Make her explain herself. No mercy. 😂
                          </li>
                          <li>
                            <span className="font-semibold text-text">2. Biggie</span><br />
                            Tell him one thing he ever said that made you mad. Today na the day. Say am with your chest. 😤
                          </li>
                          <li>
                            <span className="font-semibold text-text">3. Favour, Maureen & Courage</span><br />
                            Give them one sweet hot gist of your choice. You know the one. 🫢🔥
                          </li>
                          <li>
                            <span className="font-semibold text-text">4. Mom, Dad & your sisters</span><br />
                            Tell them how much you love them. No forming. Say am properly. 🥹💙
                          </li>
                          <li>
                            <span className="font-semibold text-text">5. Everyone else</span><br />
                            Betila and all the others wey we never mention — call dem too. Nobody go feel left out today. 🫶
                          </li>
                        </ol>

                        <p className="mt-4 font-letter text-sm text-blue-soft">— tick when you don call everybody 😂</p>
                      </div>
                    )}

                    {/* Hafsatou invite — expands below dish 3 when ticked */}
                    {dish.id === 3 && checked && (
                      <div className="mt-2 rounded-card border border-blue/30 bg-blue/5 px-5 py-5">
                        <p className="font-letter text-base text-blue-soft">📜 Official Summons</p>
                        <p className="mt-3 text-sm leading-7 text-muted">
                          Dear <span className="font-semibold text-text">Kijika Hafsatou</span>,
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          It is with great pleasure that I, the Dom Cap and Mother of the Day, do hereby summon you to my space to come soak garri with your favourite Mommy. 👑
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          Do not forget your spoon man no di use my spoon. 🥄 Take bey with that one.
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          Also, you will be required to:<br />
                          — Sing Happy Birthday at least twice 🎶<br />
                          — Not finish the groundnut before I reach 😤<br />
                          — Pretend the garri na 5-star meal (it is) 🍽️<br />
                          — Leave your wahala outside the door abeg 🚪
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted">
                          Failure to appear will result in permanent removal from the Mommy privileges list. You have been warned. 😭💙
                        </p>
                        <p className="mt-4 font-letter text-sm text-blue-soft">— Rachael, Dom Cap, Your Mommy 👑</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Chef's note */}
      <div className="mt-12 rounded-card border border-white/[0.06] bg-card px-6 py-5 text-center">
        <p className="font-letter text-lg text-blue-soft">Chef&apos;s Note</p>
        <p className="mt-2 text-sm leading-7 text-muted">
          Everything for this menu na free.<br />
          You don pay already, with all the laugh and joy wey you don give us since boarding. 💙
        </p>
      </div>
    </section>
  );
}
